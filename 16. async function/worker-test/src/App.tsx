import { useState, useEffect, useRef } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageGallery, { type ImageItem } from "./components/ImageGallery";
import DiaryInput from "./components/DiaryInput";
import {
  fileToImageData,
  createPreviewUrl,
  revokeUrl,
} from "./utils/imageUtils";
import type {
  FilterMessage,
  ProgressMessage,
  CompleteMessage,
} from "./workers/imageFilter.worker";
import ImageFilterWorker from "./workers/imageFilter.worker?worker";
import "./App.css";

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [diaryText, setDiaryText] = useState("");
  const workerRef = useRef<Worker | null>(null);
  const processingQueueRef = useRef<
    Array<{ imageId: string; filterType: "denoise" | "sharpen" }>
  >([]);
  const isProcessingRef = useRef(false);

  // 큐에서 다음 작업 처리
  const processNextInQueue = () => {
    if (isProcessingRef.current || processingQueueRef.current.length === 0) {
      return;
    }

    const next = processingQueueRef.current[0];
    if (!next || !workerRef.current) return;

    setImages((prev) => {
      const image = prev.find((img) => img.id === next.imageId);
      if (!image || !image.originalImageData || !image.imageArrayBuffer)
        return prev;

      isProcessingRef.current = true;

      // ArrayBuffer를 복사하여 Transferable로 전달 (원본 보존)
      const arrayBufferCopy = image.imageArrayBuffer.slice(0);

      const message: FilterMessage = {
        type: "FILTER",
        imageFile: arrayBufferCopy,
        imageWidth: image.originalImageData.width,
        imageHeight: image.originalImageData.height,
        filterType: next.filterType,
        imageId: next.imageId,
      };

      console.log("[Main] Worker에 작업 전송:", next.filterType, next.imageId);
      // Transferable로 전달하여 메인 스레드 블로킹 방지
      workerRef.current?.postMessage(message, [arrayBufferCopy]);

      return prev;
    });
  };

  // Worker 초기화
  useEffect(() => {
    workerRef.current = new ImageFilterWorker();

    workerRef.current.onmessage = (
      event: MessageEvent<ProgressMessage | CompleteMessage>
    ) => {
      const message = event.data;

      console.log("[Main] Worker 메시지 수신:", message.type, message.imageId);

      if (message.type === "PROGRESS") {
        setImages((prev) =>
          prev.map((img) => {
            if (img.id === message.imageId) {
              const currentJob = processingQueueRef.current[0];
              if (currentJob?.imageId === message.imageId) {
                return currentJob.filterType === "denoise"
                  ? { ...img, denoiseProgress: message.progress }
                  : { ...img, sharpenProgress: message.progress };
              }
            }
            return img;
          })
        );
      } else if (message.type === "COMPLETE") {
        const completedJob = processingQueueRef.current[0];

        console.log("[Main] 작업 완료:", completedJob);

        setImages((prev) =>
          prev.map((img) => {
            if (img.id === message.imageId && completedJob) {
              if (completedJob.filterType === "denoise") {
                return {
                  ...img,
                  denoisedImageData: message.result,
                  denoiseProgress: 100,
                };
              } else {
                return {
                  ...img,
                  sharpenedImageData: message.result,
                  sharpenProgress: 100,
                };
              }
            }
            return img;
          })
        );

        // 큐에서 완료된 작업 제거
        processingQueueRef.current.shift();
        isProcessingRef.current = false;

        // 다음 작업 처리
        setTimeout(() => processNextInQueue(), 0);
      }
    };

    workerRef.current.onerror = (error) => {
      console.error("[Main] Worker 오류:", error);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // 이미지 선택 핸들러
  const handleImagesSelected = async (files: File[]) => {
    // 기존 이미지 정리
    images.forEach((img) => {
      revokeUrl(img.previewUrl);
    });

    const newImages: ImageItem[] = await Promise.all(
      files.map(async (file, index) => {
        const previewUrl = createPreviewUrl(file);
        // 미리보기용으로만 ImageData 생성 (워커 전달용이 아님)
        const imageData = await fileToImageData(file);
        // 워커 전달용 ArrayBuffer 미리 읽기
        const imageArrayBuffer = await file.arrayBuffer();

        return {
          id: `image-${Date.now()}-${index}`,
          file,
          previewUrl,
          originalImageData: imageData, // 미리보기용
          imageArrayBuffer, // 워커 전달용
        };
      })
    );

    setImages(newImages);

    // 각 이미지에 대해 필터링 작업 큐에 추가
    newImages.forEach((image) => {
      // 노이즈 캔슬링
      processingQueueRef.current.push({
        imageId: image.id,
        filterType: "denoise",
      });

      // 샤프닝
      processingQueueRef.current.push({
        imageId: image.id,
        filterType: "sharpen",
      });
    });

    // 첫 번째 작업 시작
    processNextInQueue();
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>🖼️ 이미지 필터링 워커</h1>
        <p>Web Worker를 활용한 비동기 이미지 처리</p>
      </header>

      <main className='app-main'>
        <div className='app-content'>
          <section className='upload-section'>
            <ImageUploader onImagesSelected={handleImagesSelected} />
          </section>

          {images.length > 0 && (
            <section className='gallery-section'>
              <ImageGallery images={images} />
            </section>
          )}

          <section className='diary-section'>
            <DiaryInput value={diaryText} onChange={setDiaryText} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
