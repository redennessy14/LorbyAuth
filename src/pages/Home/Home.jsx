import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/Home.module.scss";
import IMG from "../../images/headerimage.png";
import SignIn from "../../components/SignIn/SignIn";
import SingUp from "../../components/SignUp/SingUp";
import ICON from "../../images/icon.png";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";

const Home = () => {
  const { handleSignOut, showAuth } = useContext(AuthContext);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showActivation, setShowActivation] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = () => {
    setShowSignUp(false);
    setShowActivation(false);
  };

  const handleLogOut = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    handleSignOut({ refresh_token: tokens.refresh });
  };

  return (
    <div className={style.home}>
      <div className={style.left}>
        {showAuth ? <h2>С возвращением!</h2> : ""}
        <img src={IMG} alt="" />
        <h1>Lorby</h1>
        <p>Твой личный репетитор</p>
        {showAuth ? (
          <div>
            <span className={style.linkText} onClick={openModal}>
              {" "}
              Выйти
            </span>{" "}
            <div>
              {" "}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={style.modal}
                overlayClassName={style.overlay}
              >
                <h2>Выйти ?</h2>
                <p>Точно выйти?</p>
                <button onClick={handleLogOut} className={style.btnModal}>
                  Да , точно
                </button>
                <p onClick={closeModal} className={style.linkText}>
                  Нет , остаться
                </p>
              </Modal>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {showSignUp ? (
        <div onClick={handleClick} className={style.linkBack}>
          <div>
            {" "}
            <img src={ICON} alt="" />
          </div>
          <div>
            {" "}
            <p>Назад</p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={`${showAuth ? style.showAuth : style.right}`}>
        {showSignUp ? (
          <SingUp
            setShowActivation={setShowActivation}
            showActivation={showActivation}
          />
        ) : (
          <SignIn setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
