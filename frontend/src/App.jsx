import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // 시작 화면
import Game from "./pages/Game"; // 이동할 게임 화면

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* 홈 경로 */}
                <Route path="/game" element={<Game />} /> {/* 게임 경로 */}
            </Routes>
        </Router>
    );
};

export default App;
