import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// router 설정
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
