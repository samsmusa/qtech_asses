import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Product from "./pages/product";

function App() {
  const location = useLocation();
  const handleRoter = () => {
    switch (location.pathname.toLowerCase()) {
      case "/":
        return <Product />;

      default:
        break;
    }
  };
  return (
    <div className="App bg-gray-200">
      <img
        className="max-h-44 w-full"
        src="http://localhost:7000/media/8106418.jpg"
      />
      <ToastContainer theme="dark" />
      <div className="min-h-screen mt-4">{handleRoter()}</div>
    </div>
  );
}

export default App;
