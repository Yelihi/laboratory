import { useEffect, useState } from 'react';
import { imageDataToDataUrl } from '../utils/imageUtils';
import './ImageGallery.css';

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  originalImageData?: ImageData;
  imageArrayBuffer?: ArrayBuffer; // 워커 전달용
  denoisedImageData?: ImageData;
  sharpenedImageData?: ImageData;
  denoiseProgress?: number;
  sharpenProgress?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="image-gallery">
      <h2>이미지 처리 결과</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

function ImageCard({ image }: { image: ImageItem }) {
  const [denoisedUrl, setDenoisedUrl] = useState<string>('');
  const [sharpenedUrl, setSharpenedUrl] = useState<string>('');

  useEffect(() => {
    if (image.denoisedImageData) {
      const url = imageDataToDataUrl(image.denoisedImageData);
      setDenoisedUrl(url);
    }
  }, [image.denoisedImageData]);

  useEffect(() => {
    if (image.sharpenedImageData) {
      const url = imageDataToDataUrl(image.sharpenedImageData);
      setSharpenedUrl(url);
    }
  }, [image.sharpenedImageData]);

  return (
    <div className="image-card">
      <div className="image-header">
        <h3>{image.file.name}</h3>
      </div>
      
      <div className="image-comparison">
        <div className="image-section">
          <h4>원본</h4>
          <img src={image.previewUrl} alt="원본" className="image-preview" />
        </div>
        
        <div className="image-section">
          <h4>
            노이즈 캔슬링
            {image.denoiseProgress !== undefined && image.denoiseProgress < 100 && (
              <span className="progress-badge">{image.denoiseProgress}%</span>
            )}
          </h4>
          {denoisedUrl ? (
            <img src={denoisedUrl} alt="노이즈 캔슬링" className="image-preview" />
          ) : (
            <div className="image-placeholder">
              {image.denoiseProgress !== undefined ? (
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${image.denoiseProgress}%` }} />
                  <span>{image.denoiseProgress}%</span>
                </div>
              ) : (
                <span>대기 중...</span>
              )}
            </div>
          )}
        </div>
        
        <div className="image-section">
          <h4>
            샤프닝
            {image.sharpenProgress !== undefined && image.sharpenProgress < 100 && (
              <span className="progress-badge">{image.sharpenProgress}%</span>
            )}
          </h4>
          {sharpenedUrl ? (
            <img src={sharpenedUrl} alt="샤프닝" className="image-preview" />
          ) : (
            <div className="image-placeholder">
              {image.sharpenProgress !== undefined ? (
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${image.sharpenProgress}%` }} />
                  <span>{image.sharpenProgress}%</span>
                </div>
              ) : (
                <span>대기 중...</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

