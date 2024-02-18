import React from "react";
import Home from "../pages/Home/Home";
import SignUp from "../components/SignUp/SingUp";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
};

export default Routing;
