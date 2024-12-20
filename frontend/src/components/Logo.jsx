import React from "react";
import ToiRspLogo from "../assets/logo.png"; // 로고 이미지
import "../styles/Logo.css";

const Logo = () => {
    return (
        <img src={ToiRspLogo} className="logo" alt="ToiRsp logo" />
    );
};

export default Logo;
