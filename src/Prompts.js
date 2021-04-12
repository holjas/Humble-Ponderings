import React from "react";
import firebase from "./firebase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrinAlt,
  faGrinHearts,
  faGrinStars,
  faMehRollingEyes,
  faAngry,
  faDizzy,
  faTired,
  faSadCry,
} from "@fortawesome/free-regular-svg-icons";

function Prompts(props) {
  // const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");
  // const [musings, setMusings] = useState([]);
  const [mood, setMood] = useState("");
  const [countMusings, setCountMusings] = useState(1);

  //grab date and time
  const dateTimeFunction = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date} ${time}`;
  };
  //captures the text input values
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  //submits the input to the database
  const handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref().child("musings");

    const dateTime = dateTimeFunction();
    dbRef.push([countMusings, displayPrompts, userInput, dateTime, mood]);
    setUserInput("");
    setMood("");
    setCountMusings(countMusings + 1);
  };

  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = props.prompts.length;
    setDisplayPrompts(props.prompts[randomNumber(promptLength)]);
  };
  //toggle display once user has entered information
  function toggleDisplay(e) {
    if (e.target.className === "show") {
      e.target.className = "hidden";
    } else {
      e.target.className = "show";
    }
  }

  //submits selected mood to the database
  const handleMood = (e) => {
    const selectedMood = e.target.id;
    setMood(selectedMood);
  };

  //generate a random number
  const randomNumber = (length) => {
    const number = Math.floor(Math.random() * length);
    return number;
  };

  return (
    <>
      <h2 className="show" onClick={toggleDisplay}>
        {displayPrompts}
      </h2>
      <h3>{mood}</h3>
      <form action="submit">
        <label htmlFor="newMusings">Put a thought there</label>
        <input
          type="text"
          id="newMusings"
          onChange={handleChange}
          value={userInput}
        />
        <p className="moodText">Add a feel</p>
        <div className="moodWrapper">
          <div className="mood" onClick={handleMood} value="happy" id="happy">
            <FontAwesomeIcon icon={faGrinAlt} />
          </div>
          <div className="mood" onClick={handleMood} value="love" id="love">
            <FontAwesomeIcon icon={faGrinHearts} />
          </div>
          <div
            className="mood"
            onClick={handleMood}
            value="excited"
            id="excited"
          >
            <FontAwesomeIcon icon={faGrinStars} />
          </div>
          <div
            className="mood"
            onClick={handleMood}
            value="whatever"
            id="whatever"
          >
            <FontAwesomeIcon icon={faMehRollingEyes} />
          </div>
          <div className="mood" onClick={handleMood} value="angry" id="angry">
            <FontAwesomeIcon icon={faAngry} />
          </div>
          <div
            className="mood"
            onClick={handleMood}
            value="shocked"
            id="shocked"
          >
            <FontAwesomeIcon icon={faDizzy} />
          </div>
          <div className="mood" onClick={handleMood} value="tired" id="tired">
            <FontAwesomeIcon icon={faTired} />
          </div>
          <div className="mood" onClick={handleMood} value="Sad" id="sad">
            <FontAwesomeIcon icon={faSadCry} />
          </div>
        </div>
        <button onClick={handleClick}>im a button</button>
        <button onClick={handleRandom}>generate a new prompt</button>
      </form>
    </>
  );
}

export default Prompts;
