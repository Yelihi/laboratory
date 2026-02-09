// Worker 메시지 타입 정의
export interface FilterMessage {
  type: 'FILTER';
  imageFile: ArrayBuffer;
  imageWidth: number;
  imageHeight: number;
  filterType: 'denoise' | 'sharpen';
  imageId: string;
}

export interface ProgressMessage {
  type: 'PROGRESS';
  progress: number;
  imageId: string;
}

export interface CompleteMessage {
  type: 'COMPLETE';
  result: ImageData;
  imageId: string;
}

export type WorkerMessage = FilterMessage;
export type MainThreadMessage = ProgressMessage | CompleteMessage;

// 노이즈 캔슬링 필터 (가우시안 블러 기반)
async function applyDenoiseFilter(imageData: ImageData): Promise<ImageData> {
  const { data, width, height } = imageData;
  const result = new ImageData(width, height);
  const resultData = result.data;
  
  // 가우시안 커널 (5x5)
  const kernel = [
    0.003765, 0.015019, 0.023792, 0.015019, 0.003765,
    0.015019, 0.059912, 0.094907, 0.059912, 0.015019,
    0.023792, 0.094907, 0.150342, 0.094907, 0.023792,
    0.015019, 0.059912, 0.094907, 0.059912, 0.015019,
    0.003765, 0.015019, 0.023792, 0.015019, 0.003765,
  ];
  const kernelSize = 5;
  const halfKernel = Math.floor(kernelSize / 2);
  
  const totalPixels = width * height;
  let processedPixels = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = Math.min(Math.max(x + kx - halfKernel, 0), width - 1);
          const py = Math.min(Math.max(y + ky - halfKernel, 0), height - 1);
          const idx = (py * width + px) * 4;
          const weight = kernel[ky * kernelSize + kx];
          
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
          a += data[idx + 3] * weight;
        }
      }
      
      const idx = (y * width + x) * 4;
      resultData[idx] = Math.round(r);
      resultData[idx + 1] = Math.round(g);
      resultData[idx + 2] = Math.round(b);
      resultData[idx + 3] = Math.round(a);
      
      processedPixels++;
      
      // 진행률 업데이트 (매 1000픽셀마다)
      if (processedPixels % 1000 === 0) {
        const progress = Math.floor((processedPixels / totalPixels) * 100);
        self.postMessage({
          type: 'PROGRESS',
          progress,
          imageId: (self as any).currentImageId,
        } as ProgressMessage);
      }
      
      // 매 10000픽셀마다 yield하여 메인 스레드가 블로킹되지 않도록 함
      if (processedPixels % 10000 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }
  
  return result;
}

// 샤프닝 필터 (라플라시안 커널 기반)
async function applySharpenFilter(imageData: ImageData): Promise<ImageData> {
  const { data, width, height } = imageData;
  const result = new ImageData(width, height);
  const resultData = result.data;
  
  // 샤프닝 커널 (3x3)
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0,
  ];
  const kernelSize = 3;
  const halfKernel = Math.floor(kernelSize / 2);
  
  const totalPixels = width * height;
  let processedPixels = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = Math.min(Math.max(x + kx - halfKernel, 0), width - 1);
          const py = Math.min(Math.max(y + ky - halfKernel, 0), height - 1);
          const idx = (py * width + px) * 4;
          const weight = kernel[ky * kernelSize + kx];
          
          r += data[idx] * weight;
          g += data[idx + 1] * weight;
          b += data[idx + 2] * weight;
          a += data[idx + 3] * weight;
        }
      }
      
      const idx = (y * width + x) * 4;
      resultData[idx] = Math.min(Math.max(Math.round(r), 0), 255);
      resultData[idx + 1] = Math.min(Math.max(Math.round(g), 0), 255);
      resultData[idx + 2] = Math.min(Math.max(Math.round(b), 0), 255);
      resultData[idx + 3] = Math.round(a);
      
      processedPixels++;
      
      // 진행률 업데이트 (매 1000픽셀마다)
      if (processedPixels % 1000 === 0) {
        const progress = Math.floor((processedPixels / totalPixels) * 100);
        self.postMessage({
          type: 'PROGRESS',
          progress,
          imageId: (self as any).currentImageId,
        } as ProgressMessage);
      }
      
      // 매 10000픽셀마다 yield하여 메인 스레드가 블로킹되지 않도록 함
      if (processedPixels % 10000 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }
  
  return result;
}

// ArrayBuffer를 ImageData로 변환
async function arrayBufferToImageData(buffer: ArrayBuffer, width: number, height: number): Promise<ImageData> {
  const blob = new Blob([buffer]);
  const imageBitmap = await createImageBitmap(blob);
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context를 가져올 수 없습니다.');
  }
  
  ctx.drawImage(imageBitmap, 0, 0);
  return ctx.getImageData(0, 0, width, height);
}

// Worker 메시지 핸들러
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const { type, imageFile, imageWidth, imageHeight, filterType, imageId } = event.data;
  
  if (type === 'FILTER') {
    // 현재 처리 중인 이미지 ID 저장
    (self as any).currentImageId = imageId;
    
    console.log(`[Worker] 필터링 시작: ${filterType} for ${imageId}`);
    
    // 비동기로 처리
    (async () => {
      try {
        // ArrayBuffer를 ImageData로 변환
        const imageData = await arrayBufferToImageData(imageFile, imageWidth, imageHeight);
        
        let result: ImageData;
        
        if (filterType === 'denoise') {
          result = await applyDenoiseFilter(imageData);
        } else if (filterType === 'sharpen') {
          result = await applySharpenFilter(imageData);
        } else {
          throw new Error(`Unknown filter type: ${filterType}`);
        }
        
        console.log(`[Worker] 필터링 완료: ${filterType} for ${imageId}`);
        
        // 완료 메시지 전송
        self.postMessage({
          type: 'COMPLETE',
          result,
          imageId,
        } as CompleteMessage);
      } catch (error) {
        console.error(`[Worker] 필터링 오류:`, error);
        // 오류 발생 시 빈 ImageData 반환
        const errorImageData = new ImageData(imageWidth, imageHeight);
        self.postMessage({
          type: 'COMPLETE',
          result: errorImageData,
          imageId,
        } as CompleteMessage);
      }
    })();
  }
});

