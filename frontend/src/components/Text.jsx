import React from "react";
import "../styles/Text.css";

const Text = () => {
    return (
        <p className="home-text">
            라즈베리파이를 이용한 반응 속도 게임입니다.
            <br />
            불빛이 들어온 <span className="highlight">LED</span>에 해당하는 <br /> 버튼을 눌러주세요.
        </p>
    );
};

export default Text;
