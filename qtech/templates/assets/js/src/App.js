import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Product from "./pages/product";
import Slider from "./components/@common/Slider";
import useAxios from "./hooks/useAxios";
import { apis } from "./components/@common/api";

function App() {
  const location = useLocation();
  const [sliderImage, setSliderImage] = React.useState([]);
  const { data } = useAxios(apis.public.category);
  const handleRoter = () => {
    switch (location.pathname.toLowerCase()) {
      case "/":
        return <Product />;

      default:
        break;
    }
  };
  React.useEffect(() => {
    if (data.length > 0) {
      let images = [];
      data.forEach((cat) => {
        cat?.image.forEach((img) => {
          images.push(img.file);
        });
      });
      setSliderImage(images);
    }
  }, [data]);
  return (
    <div
      className="App  bg-gradient-to-bl from-violet-300 via-violet-400 to-fuchsia-200 
    animate-gradient-xy"
    >
      <Slider data={sliderImage} />
      <ToastContainer theme="dark" />
      <div className="min-h-screen mt-4">{handleRoter()}</div>
    </div>
  );
}

export default App;
