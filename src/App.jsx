import { useState } from "react";
import Routing from "./utils/Routing";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <BrowserRouter>
          {" "}
          <Routing />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
