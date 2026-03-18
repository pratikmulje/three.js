import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import VRScene from "./components/Landing";
import Explore from "./components/Explore";
import "./App.css";

// Home Component
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="overlay">
        <h1>Welcome to VR World</h1>
        <p>This is my Three.js animation by Pratik</p>
        <button onClick={() => navigate("/explore")}>
          Explore Now
        </button>
      </div>
      <VRScene />
    </>
  );
}

// App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;