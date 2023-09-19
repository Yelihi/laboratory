import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import PocketMon from "./components/pocket/PocketMon";
import ImageCompression from "./components/imageResizing/ImageCompression";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/pocketmon' element={<PocketMon />} />
      <Route path='/image' element={<ImageCompression />} />
    </Routes>
  </BrowserRouter>
);
