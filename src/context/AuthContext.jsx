import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = React.createContext();

const getConfig = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const Auth = `Bearer ${tokens.access}`;
  return {
    headers: {
      Authorization: Auth,
    },
  };
};

const AuthContextProvider = ({ children }) => {
  const [showAuth, setShowAuth] = useState(false);

  const handleSignIn = async (data2) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login/`, data2);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", data2.email);
      toast.success("Вы успешно вошли в аккаунт!");
      setShowAuth(true);
    } catch (error) {
      console.log(error, "error");
      toast.error("Неверный логин или пароль!");
    }
  };

  const handleSignUp = async (data) => {
    try {
      localStorage.setItem("email", data.email);
      await axios.post(`${BASE_URL}/register/`, data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleEmailConfirm = async (code) => {
    try {
      console.log(code, "rabit");
      await axios.post(`${BASE_URL}/email-confirm/`, code);
      setShowAuth(true);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleResendCode = async (email) => {
    try {
      await axios.post(`${BASE_URL}/resend-confirmation-code/`, email);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSignOut = async (refresh_token) => {
    try {
      await axios.post(`${BASE_URL}/logout/`, refresh_token, getConfig());
      localStorage.removeItem("tokens");
      localStorage.removeItem("email");
      setShowAuth(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        handleEmailConfirm,
        handleResendCode,
        handleSignOut,
        showAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
