import { useState } from "react";
import "./App.css";
// import About from "./component/About";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import Alert from "./component/Alert";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("white");
  const [changeMode, setChangeMode] = useState("Enable DarkMode");
  const [alerts, setAlerts] = useState(null);

  const showAlert = (type, message) => {
    setAlerts({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlerts(null);
    }, 1000);
  };

  const toggleMode = () => {
    if (mode === "white") {
      setMode("red");
      setChangeMode("Disable DarkMode");
      document.body.style.backgroundColor = "#042743 ";
      showAlert("Darkmode Enable successful !", "success");
    } else {
      setMode("white");
      setChangeMode("Enable DarkMode");
      document.body.style.backgroundColor = "white";
      showAlert("Darkmode Disable successful !", "success");
    }
  };

  // green background activate function

  // const greenBg = () => {
  //   if (mode === "white") {
  //     setMode("red");
  //     document.body.style.backgroundColor = "darkgreen ";
  //   } else {
  //     setMode("red");
  //     document.body.style.backgroundColor = "darkgreen ";
  //   }
  // };

  // grey background activate function

  // const greyBg = () => {
  //   if (mode === "white") {
  //     setMode("red");
  //     document.body.style.backgroundColor = "grey ";
  //   } else {
  //     setMode("red");
  //     document.body.style.backgroundColor = "grey ";
  //   }
  // };

  // black background activate function

  // const blackBg = () => {
  //   if (mode === "white") {
  //     setMode("red");
  //     document.body.style.backgroundColor = "black";
  //   } else {
  //     setMode("red");
  //     document.body.style.backgroundColor = "black";
  //   }
  // };

  return (
    <>
      {/* <BrowserRouter> */}
      <Navbar
        title="TextUtils"
        aboutText="About"
        mode={mode}
        toggleMode={toggleMode}
        changeMode={changeMode}
        // greyBg={greyBg}
        // greenBg={greenBg}
        // blackBg={blackBg}
      />
      <Alert alert={alerts} />

      <div className="container">
        {/* <Routes> */}
        {/* /users --> Component 1
          /users/home --> Component 2  use exact path for not future error */}

        {/* <Route exact path="/about" element={<About />}></Route> */}
        {/* <Route
              exact
              path="/"
              element={
               
              }
            ></Route> */}
        {/* </Routes> */}
        <TextForm
          showAlert={showAlert}
          heading="Enter to text Analyse"
          mode={mode}
        />
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;

// we comment react router code, bcoz of hosting react app on Github page
