const appendOutput = (text: string) => {
  const output = document.getElementById("output");
  if (output) {
    output.textContent += text;
  }
};

const clearOutput = () => {
  const output = document.getElementById("output");
  if (output) {
    output.textContent = "";
  }
};

const processStreamData = async (stream: ReadableStream<string>) => {
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      appendOutput(value);
    }
  } finally {
    reader.releaseLock();
  }
};

const connectToStream = async () => {
  try {
    appendOutput("스트림 연결 시도 중...\n");
    const response = await fetch("/stream");

    if (!response.body) {
      appendOutput("응답 본문이 없습니다.\n");
      return;
    }

    const stream = response.body.pipeThrough(new TextDecoderStream());
    await processStreamData(stream);
    appendOutput("\n스트림 완료!\n");
  } catch (error) {
    console.error("Error connecting to stream:", error);
    appendOutput(
      `오류 발생: ${error instanceof Error ? error.message : String(error)}\n`
    );
  }
};

// DOM이 로드된 후 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById("connectBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (connectBtn) {
    connectBtn.addEventListener("click", connectToStream);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearOutput);
  }
});
