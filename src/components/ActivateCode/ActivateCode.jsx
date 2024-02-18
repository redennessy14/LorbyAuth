import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import style from "../../styles/ActivateCode.module.scss";

const ActivateCode = () => {
  const { handleEmailConfirm, handleResendCode } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const currentUser = localStorage.getItem("email");

  const handleChange = (index, event) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    if (event.target.value !== "" && index < 3) {
      inputsRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputsRef[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    handleEmailConfirm({ code: otp.join("") });
  };

  const handleSubmitResend = () => {
    handleResendCode({ email: currentUser });
  };

  return (
    <div className={style.activateBlock}>
      <p>Введи 4-значный код, высланный на {currentUser}</p>
      <div>
        {" "}
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            ref={inputsRef[index]}
            className={style.OtpInp}
          />
        ))}
      </div>
      <button className={style.otpBtn} onClick={handleSubmit}>
        Подтвердить
      </button>
      <div>
        <span className={style.linkText} onClick={handleSubmitResend}>
          Выслать код повторно
        </span>
      </div>
    </div>
  );
};

export default ActivateCode;
