import React from "react";
import firebase from "./firebase";
import { useState, useEffect } from "react";
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
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");
  const [mood, setMood] = useState("");

  //set the first prompt with a random selection

  useEffect(() => {
    const promptLength = props.prompts.length;
    setDisplayPrompts(props.prompts[randomNumber(promptLength)]);
  }, [props]);

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
    dbRef.push([displayPrompts, userInput, dateTime, mood]);
    setUserInput("");
    setMood("");
  };
  
  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = props.prompts.length;
    setDisplayPrompts(props.prompts[randomNumber(promptLength)]);
  };

  //submits selected mood to the database
  const handleMood = (e) => {
    const selectedMood = e.target.parentNode.id;
    const parentSelectedMood = e.target.parentNode.parentNode.id;
    if (selectedMood) {
      setMood(selectedMood)
    } else { 
      setMood(parentSelectedMood)
    }
  };

  //generate a random number
  const randomNumber = (length) => {
    const number = Math.floor(Math.random() * length);
    return number;
  };





  return (
    <>
      <h2 className="show">
        {displayPrompts}
      </h2>
      <h3>{mood}</h3>
        
      <form action="submit">
        <label htmlFor="newMusings">Put a thought there</label>
        <textarea
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
          <div className="mood" onClick={handleMood} value="sad" id="sad">
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
