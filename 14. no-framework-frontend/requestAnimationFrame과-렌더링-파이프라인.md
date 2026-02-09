# requestAnimationFrame과 렌더링 파이프라인

## 목차

- [[#requestAnimationFrame 기본 개념|requestAnimationFrame 기본 개념]]
- [[#VSync와 하드웨어 동기화|VSync와 하드웨어 동기화]]
- [[#브라우저 렌더링 파이프라인|브라우저 렌더링 파이프라인]]
- [[#더블 버퍼링과 프레임 스왑|더블 버퍼링과 프레임 스왑]]
- [[#전체 흐름 타임라인|전체 흐름 타임라인]]
- [[#FPS 측정 코드 분석|FPS 측정 코드 분석]]

---

## requestAnimationFrame 기본 개념

### 핵심 원리

`requestAnimationFrame`은 **한 번 호출되면 다음 화면 새로고침 시점에 콜백이 한 번만 실행**됩니다.

```javascript
// ❌ 잘못된 예: 한 번만 실행되고 끝남
requestAnimationFrame(() => {
  console.log('이것은 한 번만 실행됩니다');
});

// ✅ 올바른 예: 재귀 호출로 연속 실행
const loop = () => {
  console.log('매 프레임마다 실행됨');
  requestAnimationFrame(loop); // 다음 프레임 예약
};
requestAnimationFrame(loop);
```

### 재귀 호출이 필요한 이유

`requestAnimationFrame`은 **다음 프레임을 예약하는 함수**이므로, 연속 실행을 위해서는 콜백 내부에서 다시 호출해야 합니다.

### 실행 흐름

```
init() 호출
  ↓
requestAnimationFrame(초기화 콜백) 등록
  ↓
[다음 프레임 도착]
  ↓
초기화 콜백 실행 → tick() 호출
  ↓
tick() 실행 → frames++, FPS 계산 → requestAnimationFrame(tick) 등록
  ↓
[다음 프레임 도착]
  ↓
tick() 실행 → frames++, FPS 계산 → requestAnimationFrame(tick) 등록
  ↓
... (무한 반복)
```

### init 내부의 requestAnimationFrame vs tick 내부의 requestAnimationFrame

```javascript
// init 내부: 초기화 타이밍 맞추기 (한 번만)
window.requestAnimationFrame(() => {
  start = window.performance.now();
  parent.appendChild(panel);
  tick(); // tick 시작
});

// tick 내부: 연속 실행을 위한 재귀 호출 (매 프레임마다)
const tick = () => {
  frames++;
  // ... FPS 계산 ...
  window.requestAnimationFrame(tick); // 다음 프레임 예약
};
```

---

## VSync와 하드웨어 동기화

### VSync (Vertical Synchronization)란?

VSync는 **모니터와 그래픽 카드 간의 동기화 메커니즘**입니다.

```
┌─────────────┐         VSync 신호         ┌─────────────┐
│   모니터    │ ─────────────────────────> │ 그래픽 카드 │
│  (Monitor)  │   (주사율 신호 생성)        │   (GPU)     │
└─────────────┘                            └─────────────┘
     │                                           │
     │ 화면 갱신                                  │ 프레임 렌더링
     │ (60Hz = 16.67ms마다)                      │ (모니터 주사율에 맞춤)
```

### 각 구성 요소의 역할

#### 모니터
- **주사율(Refresh Rate) 신호 생성** (예: 60Hz = 초당 60번)
- 각 주기를 시작할 때 VSync 신호를 GPU에 전송
- 60Hz 모니터는 약 16.67ms마다 신호 전송

#### 그래픽 카드 (GPU)
- VSync 신호를 받아 다음 프레임을 준비
- 모니터의 주사율에 맞춰 프레임을 버퍼에 렌더링
- VSync 동기화를 통해 화면 찢어짐(tearing) 방지

#### 브라우저
- 운영체제를 통해 VSync 신호를 간접적으로 활용
- VSync 신호 시점에 `requestAnimationFrame` 콜백 실행

### 신호 전달 경로

```
모니터 (하드웨어 신호)
  ↓
그래픽 카드 (GPU 드라이버)
  ↓
운영체제 (OS API)
  ↓
브라우저 엔진
  ↓
requestAnimationFrame 콜백 실행
```

---

## 브라우저 렌더링 파이프라인

### 전체 파이프라인

```
[프레임 시작]
  ↓
1. JavaScript 실행 (CPU)
   └─ requestAnimationFrame 콜백 실행
  ↓
2. Style 계산 (CPU)
   └─ 어떤 CSS 스타일이 적용되는지 계산
  ↓
3. Layout (Reflow) (CPU)
   └─ 요소의 위치, 크기 계산
  ↓
4. Paint (CPU + GPU)
   ├─ CPU: Paint Record 생성 ("어디에 무엇을 그릴지" 명령 목록)
   └─ GPU: 실제 픽셀 그리기 (Rasterization)
  ↓
5. Composite (GPU)
   └─ 여러 레이어를 합성
  ↓
6. 화면 표시 (GPU → 모니터)
```

### CPU vs GPU 역할

| 단계 | 처리 장치 | 역할 |
|------|----------|------|
| JavaScript | CPU | 코드 실행, `requestAnimationFrame` 콜백 |
| Style | CPU | CSS 스타일 계산 |
| Layout | CPU | 요소 위치, 크기 계산 |
| Paint Record | CPU | 그리기 명령 목록 생성 |
| Rasterization | **GPU** | 실제 픽셀 그리기 |
| Composite | **GPU** | 레이어 합성 |
| 화면 출력 | **GPU** | 모니터로 프레임 전송 |

### Paint 단계 상세

Paint는 두 단계로 나뉩니다:

#### 1. Paint Record 생성 (CPU)

```javascript
// CPU가 하는 일 (의사 코드)
function createPaintRecord(element) {
  const commands = [];
  
  commands.push({
    type: 'fillRect',
    x: 0, y: 0,
    width: 50, height: 50,
    color: 'black'
  });
  
  return commands; // "그리기 명령 목록" 반환
}
```

- CPU가 **"어디에 무엇을 그릴지" 명령 목록**을 생성
- 실제 픽셀은 아직 그려지지 않음

#### 2. Rasterization (GPU)

```javascript
// GPU가 하는 일 (의사 코드)
function rasterize(paintCommands) {
  for (const command of paintCommands) {
    switch (command.type) {
      case 'fillRect':
        // GPU가 실제로 픽셀을 그림
        drawPixels(command.x, command.y, 
                   command.width, command.height, 
                   command.color);
        break;
    }
  }
}
```

- GPU가 명령을 받아 **실제 픽셀을 그림**
- 텍스트, 이미지, 도형을 픽셀 데이터로 변환

### 그래픽 카드(GPU)의 주요 역할

1. **Paint의 Rasterization**: CPU 명령을 받아 실제 픽셀 그리기
2. **Composite**: 여러 레이어를 합성
3. **화면 출력**: 최종 이미지를 모니터로 전송
4. **VSync 동기화**: 모니터의 주사율에 맞춰 프레임 전송

---

## 더블 버퍼링과 프레임 스왑

### 더블 버퍼링의 개념

GPU와 모니터는 **두 개의 버퍼**를 사용합니다:

```
┌─────────────────┐         ┌─────────────────┐
│  프론트 버퍼     │         │   백 버퍼        │
│ (Front Buffer)  │         │ (Back Buffer)   │
│                 │         │                 │
│ [현재 화면에     │         │ [렌더링 중인     │
│  표시되는 프레임]│         │  새 프레임]      │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
       │                           │
       │ 모니터가 읽음              │ GPU가 렌더링
       │                           │
       ▼                           │
    ┌──────────┐                   │
    │  모니터   │                   │
    │  (화면)   │                   │
    └──────────┘                   │
                                   │
        VSync 신호 ──────────────┼───> 버퍼 스왑!
                                   │
                                   ▼
                         [프론트 ↔ 백 교체]
```

### 버퍼 스왑의 타이밍

**핵심**: 렌더링은 **백 버퍼**에서, 화면 표시는 **프론트 버퍼**에서 이루어집니다.

```
VSync 신호 도착 시점:
┌─────────────────────────────────────┐
│ 1. 버퍼 스왑 (즉시, 하드웨어 레벨)   │
│    프론트 ↔ 백 교체                  │
│                                     │
│ 2. 모니터가 프론트 버퍼 읽기 시작    │
│    (이제 새 프레임 표시)             │
│                                     │
│ 3. 브라우저에 VSync 신호 전달        │
│    (다음 프레임 렌더링 시작)         │
└─────────────────────────────────────┘
```

### 왜 다음 VSync에서 표시되는가?

1. **GPU는 백 버퍼에 새 프레임을 렌더링**
2. **모니터는 프론트 버퍼를 읽어 화면에 표시 중**
3. **두 버퍼는 VSync 신호 시점에만 교체(스왑)됨**
4. **따라서 VSync 신호에서 시작한 렌더링은 다음 VSync에서 화면에 표시됨**

### 더블 버퍼링의 장점

- ✅ 화면 찢어짐(tearing) 방지
- ✅ 부드러운 화면 전환
- ✅ 프레임 단위 정확한 동기화

---

## 전체 흐름 타임라인

### 60Hz 모니터 기준 (약 16.67ms 주기)

```
시간: 0ms ──────────────────── 16.67ms ──────────────────── 33.34ms ──

[하드웨어 레벨]
┌────────────────────────────────────────────────────────────┐
│ 모니터                                                        │
│  0ms: VSync 신호 생성 (새 프레임 시작)                       │
│      └─> 그래픽 카드(GPU)로 전기 신호 전송                    │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ 그래픽 카드 (GPU 드라이버)                                   │
│  0ms: VSync 신호 수신                                        │
│      └─> OS에 이벤트 전달 (GPU 드라이버 → OS 커널)           │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
[소프트웨어 레벨]
┌────────────────────────────────────────────────────────────┐
│ 운영체제 (OS)                                                │
│  0ms: VSync 이벤트 수신 (OS 커널)                            │
│      └─> 브라우저 프로세스에 메시지 전달                      │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ 브라우저 엔진                                                │
│  0ms: VSync 이벤트 수신                                      │
│      └─> requestAnimationFrame 콜백 큐 실행 시작             │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
[브라우저 렌더링 파이프라인]
┌────────────────────────────────────────────────────────────┐
│ 1. JavaScript 실행 (CPU) - 0 ~ 2ms                           │
│    └─ requestAnimationFrame 콜백 실행                        │
│    └─ tick() 실행                                            │
│    └─ requestAnimationFrame(tick) 등록                       │
│                                                            │
│ 2. Style 계산 (CPU) - 2 ~ 3ms                                │
│    └─ CSS 스타일 계산                                        │
│                                                            │
│ 3. Layout (CPU) - 3 ~ 5ms                                    │
│    └─ 요소 위치, 크기 계산                                   │
│                                                            │
│ 4. Paint Record 생성 (CPU) - 5 ~ 6ms                         │
│    └─ "그리기 명령 목록" 생성                                │
│                                                            │
│ 5. Rasterization (GPU) - 6 ~ 12ms ⭐                        │
│    └─ GPU가 실제 픽셀 그리기                                 │
│                                                            │
│ 6. Composite (GPU) - 12 ~ 14ms                               │
│    └─ 레이어 합성                                            │
│                                                            │
│ 7. 프레임 버퍼에 저장 (GPU) - 14 ~ 15ms                      │
│    └─ 백 버퍼에 완성된 프레임 저장                            │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│ 그래픽 카드 (GPU)                                            │
│  15ms: 백 버퍼에 프레임 렌더링 완료                          │
│  16.67ms: 다음 VSync 신호 대기                                │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼ (16.67ms: VSync 신호)
┌────────────────────────────────────────────────────────────┐
│ 버퍼 스왑!                                                    │
│  프론트 버퍼 ↔ 백 버퍼 교체                                   │
│                                                            │
│ 모니터                                                        │
│  16.67ms: VSync 신호                                         │
│      └─> 프론트 버퍼(새 프레임) 읽기                         │
│      └─> 화면에 표시                                         │
└────────────────────────────────────────────────────────────┘
```

### 실제 실행 흐름

```
[VSync 신호 1 - 0ms]
  │
  ├─> 버퍼 스왑 (프론트 ↔ 백)
  │   └─ 백 버퍼에 있던 새 프레임을 프론트로 이동
  │
  ├─> 모니터: 프론트 버퍼 읽기 시작 (새 화면 표시)
  │
  └─> 브라우저: VSync 신호 수신
      └─> requestAnimationFrame 콜백 실행
      └─> 백 버퍼에 다음 프레임 렌더링 시작

[VSync 신호 2 - 16.67ms]
  │
  ├─> 버퍼 스왑 (프론트 ↔ 백)
  │   └─ 방금 렌더링한 프레임이 프론트로 이동
  │
  ├─> 모니터: 새 프레임 표시 시작
  │
  └─> 브라우저: 다음 프레임 렌더링 시작
```

---

## FPS 측정 코드 분석

### 전체 코드

```javascript:fps.js
/**
 * requestAnimationFrame 콜백을 사용하여 현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하고
 * 콜백이 1초 내에 호출되는 횟수를 추적하면 된다.
 */

let panel;
let start;
let frames = 0;

const create = () => {
  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.left = "0px";
  div.style.top = "0px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.backgroundColor = "black";
  div.style.color = "white";
  div.style.zIndex = 1000;

  return div;
};

const tick = () => {
  frames++;
  const now = window.performance.now();

  if (now >= start + 1000) {
    panel.innerText = `${frames} FPS`;
    frames = 0;
    start = now;
  }

  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();

  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default {
  init,
};
```

### 코드 실행 흐름

1. **`init()` 호출**
   - `panel` 요소 생성
   - `requestAnimationFrame`으로 초기화 타이밍 맞추기

2. **초기화 콜백 실행 (VSync 신호 시점)**
   - `start` 시간 기록
   - `panel`을 DOM에 추가
   - `tick()` 호출로 루프 시작

3. **`tick()` 실행 (매 프레임마다)**
   - `frames` 카운터 증가
   - 1초가 지났는지 확인
   - 1초가 지났으면 FPS 표시하고 초기화
   - `requestAnimationFrame(tick)`으로 다음 프레임 예약

### 핵심 포인트

- **`init` 내부의 `requestAnimationFrame`**: 초기화 타이밍 맞추기 (한 번만)
- **`tick` 내부의 `requestAnimationFrame`**: 연속 실행을 위한 재귀 호출 (매 프레임마다)
- **FPS 계산**: 1초 동안 `tick()`이 호출된 횟수 = 프레임 수 = FPS

---

## 요약

### requestAnimationFrame
- 한 번 호출 = 한 번 실행 (다음 프레임에)
- 연속 실행을 위해서는 재귀 호출 필요
- VSync 신호와 동기화되어 실행

### VSync
- 모니터가 생성하는 주사율 신호
- 그래픽 카드가 이를 받아 프레임 렌더링 동기화
- 브라우저는 OS를 통해 간접적으로 활용

### 렌더링 파이프라인
- **CPU**: JavaScript, Style, Layout, Paint Record 생성
- **GPU**: Rasterization, Composite, 화면 출력

### 더블 버퍼링
- **프론트 버퍼**: 모니터가 읽어 화면에 표시
- **백 버퍼**: GPU가 새 프레임을 렌더링
- **VSync 시점**: 버퍼 스왑 → 새 프레임 표시

### 전체 흐름
1. VSync 신호 → GPU → OS → 브라우저
2. `requestAnimationFrame` 콜백 실행
3. 렌더링 파이프라인 (CPU → GPU)
4. 백 버퍼에 렌더링 완료
5. **다음 VSync 신호**: 버퍼 스왑 → 화면 표시

---

## 관련 자료

- [fps-wigets/fps.js](fps-wigets/fps.js)
- [fps-wigets/index.html](fps-wigets/index.html)
