# 피드 과제

> 쇼핑몰 피드 과제 구현

## 실행 방법

### 1. 환경 설정

```bash
# 의존성 설치
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 4. 환경 변수 설정 (선택사항)

`.env.local` 파일을 생성하여 다음 변수를 설정할 수 있습니다:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 고민했던 부분들

### 1. **서버/클라이언트 컴포넌트 분리 전략**

**문제**: 초기 로딩과 무한 스크롤을 어떻게 분리할 것인가?

**해결**:

- 초기 로딩: Server Component에서 `queryFeedList` 직접 호출
- 무한 스크롤: Client Component에서 API Route 호출
- `queryFeedList` 함수 내부에서 실행 환경 감지하여 분기 처리

**장점**

- 기존 spa 방식보다 컨텐츠의 웹 노출 증가
- 초기 빠른 컨텐츠 로딩 기대

### 2. **정책 기반 정렬 로직 위치**

**문제**: 정렬 로직을 어디에 둘 것인가? (UI vs Service vs API Route)

**해결**:

- **FeedService**: 정책 기반 정렬 로직 (도메인 서비스)
- **API Route**: 여러 Repository를 조합하여 호출

**장점**

- 회사의 정책을 UI 와 분리함으로서 언제든 변경 가능
- 서버에서 정책을 고려하여 리스트를 내려주는 편이 가장 적합하다고 판단

---
