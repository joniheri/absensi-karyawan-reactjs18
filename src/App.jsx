import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageNoteFound from "./pages/PageNoteFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNoteFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
