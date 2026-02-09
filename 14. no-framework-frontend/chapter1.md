## 리엑트는 라이브러리 인가 프레임워크인가?

리엑트는 공식문서에서 분명 라이브러리라고 명명하고 있으나, 분명한 제약사항은 존재한다.

### 선언적 페러다임의 사용

리엑트는 사용자가 직접적으로 DOM 을 수정하지않고, 상태를 수정한다. 이렇게 되면 리엑트는 자동적으로 변경된 상태를 비교하여 실제 DOM 을 업데이트 하는 방식이다.

```typescript
import React, { useState } from 'react';
import posed from 'react-posed';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: {
    ease: 'linear',
    duration: 500
  }
});

const PosedExample = () => {
  const [isVisible, setIsVisible] = useState(true);

  const pose = isVisible ? 'visible' : 'hidden'

  const toggle = () => {
    setIsVisible((prev) => !prev);
  }

  return {
    <div>
      <Box className='box' pose={pose} />
      <button onClick={toggle}>Toggle</button>
    </div>
  }
}


```
