const btn = document.querySelector("button");

function sendData(data) {
  console.log("sending data");

  const XHR = new XMLHttpRequest();

  const urlEncodedDataPairs = [];

  // 데이터 객체를 URL-enconded key/value pairs 배열로 변경해준다
  for (const [name, value] of Object.entries(data)) {
    urlEncodedDataPairs.push(
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    );
  }

  const urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

  // 성공시
  XHR.addEventListener("load", (event) => {
    alert("성공");
  });

  // 에러발생
  XHR.addEventListener("error", (event) => {
    alert("에러발생");
  });

  //리퀘스트 셋팅하기
  XHR.open("POST", "https://example.com/cors.php");

  // 헤더 추가하기
  XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // 마지막 데이터 보내기
  XHR.send(urlEncodedData);
}

btn.addEventListener("click", () => {
  sendData({ test: "ok" });
});
