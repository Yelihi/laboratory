import { Routes, Route } from "react-router-dom";
import "./App.css";

import Country from "./pages/Country";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/country/:code' element={<Country />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
