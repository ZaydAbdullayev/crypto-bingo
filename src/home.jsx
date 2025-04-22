// src/App.jsx
import { useState } from "react";
import "./home.css";
import {
  generateExplanation,
  savePackAsImage,
} from "./context/fetch.service";
import { sins } from "./context/data";
import { RiTwitterXFill } from "react-icons/ri";

export const App = () => {
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const toggleSin = (sin) => {
    setSelected((prev) =>
      prev.includes(sin) ? prev.filter((s) => s !== sin) : [...prev, sin]
    );
  };

  const handleContinue = () => setShowResult(true);
  const handleReset = () => {
    setShowResult(false);
    setSelected([]);
  };

  const downloadResult = async () => {
    const cardElement = document.querySelector(".result");
    savePackAsImage(cardElement);
  };

  return (
    <div className="app">
      {!showResult ? (
        <>
          <h1 className="title gradient-text">CRYPTO BINGO</h1>
          <p className="subtitle">choose what happens to you</p>
          <div className="grid">
            {sins.map((sin, i) => (
              <div
                key={i}
                className={`sin ${selected.includes(sin) ? "selected" : ""}`}
                onClick={() => toggleSin(sin)}
              >
                {sin}
              </div>
            ))}
          </div>
          <div className="btns">
            <button
              className="btn-weird"
              onClick={() =>
                window.open("https://x.com/cryptobingo_sol", "_blank")
              }
            >
              Follow <RiTwitterXFill />
            </button>
            <button className="btn-weird" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="result">
            <h2 className="result-title">My choices</h2>
            <ul>
              {selected.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <h3 className="result-title">AI Description</h3>
            <p className="ai-text">
              {generateExplanation(selected)} <i></i>
            </p>
          </div>
          <div className="btns ss">
            <button onClick={handleReset} className="btn-weird">
              Go Home
            </button>
            <button className="btn-weird" onClick={downloadResult}>
              Download Result
            </button>
          </div>
        </>
      )}
    </div>
  );
};
