import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Game = () => {
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [score, setScore] = useState(null); // 점수 상태
    const [logs, setLogs] = useState([]); // 로그 상태
    const [error, setError] = useState(null); // 오류 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const fetchGameLogs = async () => {
        try {
            if (!nickname.trim()) {
                setError("닉네임을 입력해주세요."); // 닉네임 미입력 시 오류 처리
                return;
            }

            setLoading(true);
            setError(null);

            // API 호출
            const response = await fetch(
                `http://localhost:8000/api/game-logs/?nickname=${encodeURIComponent(
                    nickname
                )}`
            );
            const data = await response.json();

            if (response.ok) {
                setScore(data.score); // 점수 상태 업데이트
                setLogs(data.logs || []); // 로그 상태 업데이트
            } else {
                setError(data.error || "게임 로그를 가져오지 못했습니다.");
            }
        } catch (err) {
            console.error("API 호출 오류:", err);
            setError("게임 실행 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <h1>Game Results</h1>
            <div>
                <label htmlFor="nickname">닉네임:</label>
                <input
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)} // 닉네임 입력 처리
                />
            </div>
            {loading ? (
                <p>데이터를 불러오는 중...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : score !== null ? (
                <div>
                    <p>최종 점수: {score}</p>
                    <h2>Game Logs</h2>
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index}>{log}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <button onClick={fetchGameLogs}>게임 시작</button> // API 호출 버튼
            )}

            {/* 오른쪽 하단 Home으로 돌아가는 버튼 */}
            <button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                Home으로 돌아가기
            </button>
        </div>
    );
};

export default Game;
