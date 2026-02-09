import { type ChangeEvent } from 'react';
import './DiaryInput.css';

interface DiaryInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DiaryInput({ value, onChange }: DiaryInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;

  return (
    <div className="diary-input-container">
      <div className="diary-header">
        <h2>일기 작성</h2>
        <div className="diary-stats">
          <span>단어: {wordCount}</span>
          <span>글자: {charCount}</span>
        </div>
      </div>
      <textarea
        className="diary-textarea"
        placeholder="이미지가 처리되는 동안 일기를 작성해보세요..."
        value={value}
        onChange={handleChange}
        rows={10}
      />
      <p className="diary-hint">
        💡 이미지 필터링 작업 중에도 자유롭게 일기를 작성할 수 있습니다.
      </p>
    </div>
  );
}

