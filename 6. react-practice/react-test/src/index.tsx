import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
