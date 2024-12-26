import React, { useState, useEffect } from "react";
import "../styles/HighScore.css";

const HighScoreList = () => {
    const [scores, setScores] = useState([]); // 점수 목록 상태
    const [error, setError] = useState(null); // 오류 상태

    useEffect(() => {
        const fetchHighScores = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/highscores/");
                const data = await response.json();

                if (response.ok) {
                    setScores(data); // 점수 목록 업데이트
                } else {
                    setError("점수 데이터를 가져오지 못했습니다.");
                }
            } catch (err) {
                console.error("API 호출 오류:", err);
                setError("데이터를 가져오는 중 오류가 발생했습니다.");
            }
        };

        fetchHighScores();
    }, []); // 컴포넌트가 마운트될 때 한 번 실행

    return (
        <div>
            <h1 className="high-score-title">명예의 전당</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p> // 오류 메시지 표시
            ) : (
                <div className="high-score-list">
                    {scores.map((score) => (
                        <div key={score.id} className="high-score-item">
                            <p className="high-score-name">{score.nickname}</p>
                            <p className="high-score-score">{parseFloat(score.score).toFixed(3)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HighScoreList;
