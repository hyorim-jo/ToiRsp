import React from "react";
import Logo from "../components/Logo";
import Text from "../components/Text";
import StartButton from "../components/StartButton";
import HighScoreList from "../components/HighScoreList";
import "../styles/Home.css";

const Home = () => {
    return (
        <>
            {/* 로고 섹션 */}
            <section className="home-logo">
                <Logo />
            </section>

            {/* 본문 설명 및 시작 버튼 */}
            <section className="home-body">
                <Text />
                <StartButton />
            </section>

            {/* 명예의 전당 */}
            <section className="home-high-score">
                <HighScoreList />
            </section>
        </>
    );
};

export default Home;
