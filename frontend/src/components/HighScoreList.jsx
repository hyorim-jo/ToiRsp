import React from "react";
import "../styles/HighScore.css";

const HighScoreList = () => {
    const scores = [...Array(10)].map((_, index) => ({
        name: "Name",
        time: "00:00",
    }));

    return (
        <>
            <h1 className="high-score-title">명예의 전당</h1>
            <div className="high-score-list">
                {scores.map((score, index) => (
                    <div key={index} className="high-score-item">
                        <p className="high-score-name">{score.name}</p>
                        <p className="high-score-score">{score.time}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HighScoreList;
