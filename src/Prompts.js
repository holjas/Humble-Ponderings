import React from "react";
import firebase from "./firebase";
import { useState, useEffect } from "react";

import Moodbar from "./Moodbar";

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
    return `${date}`;
  };

  //captures the text input values
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  //submits the input to the database
  const handleClick = (e) => {
    e.preventDefault();
    if (userInput) {
      const dbRef = firebase.database().ref().child("musings");

      const dateTime = dateTimeFunction();
      dbRef.push([displayPrompts, userInput, dateTime, mood]);
      setUserInput("");
      setMood("");
    } else {
      alert("Please enter input before submitting");
    }
  };

  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = props.prompts.length;
    setDisplayPrompts(props.prompts[randomNumber(promptLength)]);
  };

  //submits selected mood to the database
  const handleMood = (e) => {
    e.preventDefault();
    const selectedMood = e.target.id;
    setMood(selectedMood);
  };

  //generate a random number
  const randomNumber = (length) => {
    const number = Math.floor(Math.random() * length);
    return number;
  };

  return (
    <section className="promptContainer">
      <div className="wrapper">
        <form action="submit">
          <label htmlFor="newMusings">
            {/* diplay a writing prompt for the user */}
            <p>Your prompt for the day...</p>
            {<h4>{displayPrompts}</h4>}
          </label>
          {/* text area for user to enter their thought musing */}
          <textarea
            type="text"
            id="newMusings"
            onChange={handleChange}
            value={userInput}
          />

          <Moodbar handleMood={handleMood} />

          <div className="promptBtnContainer">
            <button onClick={handleRandom}>generate a new prompt</button>
            <input type="submit" onClick={handleClick} value="SUBMIT" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Prompts;
