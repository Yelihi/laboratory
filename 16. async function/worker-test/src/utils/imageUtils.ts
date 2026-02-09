/**
 * 이미지 파일을 ImageData로 변환
 */
export async function fileToImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context를 가져올 수 없습니다.'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      
      URL.revokeObjectURL(url);
      resolve(imageData);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지 로드에 실패했습니다.'));
    };
    
    img.src = url;
  });
}

/**
 * ImageData를 Blob URL로 변환
 */
export async function imageDataToBlobUrl(imageData: ImageData): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context를 가져올 수 없습니다.');
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Blob 생성에 실패했습니다.'));
        return;
      }
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png');
  });
}

/**
 * ImageData를 Data URL로 변환
 */
export function imageDataToDataUrl(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context를 가져올 수 없습니다.');
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

/**
 * 이미지 파일의 미리보기 URL 생성
 */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * URL 해제 (메모리 누수 방지)
 */
export function revokeUrl(url: string): void {
  URL.revokeObjectURL(url);
}

