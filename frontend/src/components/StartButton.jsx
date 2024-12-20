import React from "react";
import { useNavigate } from "react-router-dom";
import Start from "../assets/start.png"; // Start 버튼 이미지
import "../styles/StartButton.css";

const StartButton = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handleClick = () => {
        navigate("/game"); // "/game" 페이지로 이동
    };
    
    return (
        <button className="start-button" onClick={handleClick}>
            <img src={Start} className="start-img" alt="Start Button" />
        </button>
    );
};

export default StartButton;
