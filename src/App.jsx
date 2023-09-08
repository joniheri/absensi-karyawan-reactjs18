import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageNoteFound from "./pages/PageNoteFound";
import NavbarBottom from "./components/NavbarBottom";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <NavbarBottom />
    </>
  );
}

export default App;
