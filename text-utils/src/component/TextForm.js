import React, { useState } from "react";

export default function TextForm({ heading, mode, showAlert }) {
  const [text, setText] = useState("");

  function handleOnChange(e) {
    setText(e.target.value);
  }

  function handleUpperCase() {
    let newText = text.toUpperCase();
    setText(newText);
    showAlert("Converted to Uppercase !", "success");
  }

  function handleLowerCase() {
    let newText = text.toLowerCase();
    setText(newText);
    showAlert("Converted to Lowercase !", "success");
  }

  function handleClearText() {
    setText("");
    showAlert("Text Cleared !", "success");
  }

  // function handleSpeakText() {
  //   let speech = new SpeechSynthesisUtterance();
  //   speech.lang = "en-US";
  //   speech.text = text;
  //   speech.volume = 1;
  //   speech.rate = 1;
  //   speech.pitch = 1;

  //   window.speechSynthesis.speak(speech);
  // }

  // speak test not working

  function handleRemoveExtraSpace() {
    let rmv = text.split("  ");
    setText(rmv.join(""));
    showAlert("Removed Extra Spaces !", "success");
  }

  const styleDarkmode = {
    backgroundColor: mode === "white" ? "white" : "black",
    color: mode === "white" ? "black" : "white",
  };

  return (
    <>
      <div>
        <h1
          className="head1"
          style={{ color: mode === "white" ? "black" : "white" }}
        >
          {heading}
        </h1>
        <div className="textForm">
          <textarea
            className="form-control"
            id="myBox"
            value={text}
            placeholder="Enter Text here..."
            onChange={handleOnChange}
            rows="8"
            style={styleDarkmode}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={handleUpperCase}
        >
          Convert to Uppercase
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={handleLowerCase}
        >
          Convert to Lowercase
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={handleClearText}
        >
          Clear Text
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1"
          id="RmvExtraSpc"
          onClick={handleRemoveExtraSpace}
        >
          Remove Extra Space
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: mode === "white" ? "black" : "white" }}
      >
        <h2 className="head1">Your text Summary</h2>
        <div className="container length-style" style={styleDarkmode}>
          <p>
            {text.trim() === "" ? 0 : text.match(/\S+/g).length} words and{" "}
            {text.replace(/\s+/g, "").length} characters
          </p>
          <p>
            {" "}
            {0.008 * (text.trim() === "" ? 0 : text.match(/\S+/g).length)}{" "}
            Minutes reading time
          </p>
        </div>
        <h4>Preview</h4>
        <div className="container preview-style" style={styleDarkmode}>
          <p>
            {text.length > 0
              ? text
              : "Enter something in the text box above to preview it here."}
          </p>
        </div>
      </div>
    </>
  );
}

// my-1 my-2 and mx-1 mx-2 bootstrap class which give margin
