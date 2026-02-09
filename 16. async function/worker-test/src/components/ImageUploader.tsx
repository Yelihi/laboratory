import { useRef, type ChangeEvent } from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ onImagesSelected, maxImages = 10 }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // 이미지 파일만 필터링
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('이미지 파일을 선택해주세요.');
      return;
    }
    
    if (imageFiles.length < 2) {
      alert('최소 2장 이상의 이미지를 선택해주세요.');
      return;
    }
    
    if (imageFiles.length > maxImages) {
      alert(`최대 ${maxImages}장까지 선택할 수 있습니다.`);
      return;
    }
    
    onImagesSelected(imageFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="upload-button" onClick={handleClick}>
        <span className="upload-icon">📷</span>
        <span>이미지 선택 (2장 이상)</span>
      </button>
      <p className="upload-hint">최소 2장 이상의 이미지를 선택해주세요.</p>
    </div>
  );
}

