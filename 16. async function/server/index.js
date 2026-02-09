const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 정적 파일 제공: public 폴더와 상위 디렉토리의 dist 폴더
app.use(express.static("./public"));
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const lines = ["Hello", "World", "This", "is", "a", "stream"];

  for (const line of lines) {
    res.write(line + "\n");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  res.end();
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
