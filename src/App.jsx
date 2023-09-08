import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageNoteFound from "./pages/PageNoteFound";
import NavbarBottom from "./components/NavbarBottom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNoteFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <NavbarBottom />
      </BrowserRouter>
    </>
  );
}

export default App;
