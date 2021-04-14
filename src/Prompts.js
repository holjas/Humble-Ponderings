import React from "react";
import firebase from "./firebase";
import { useState, useEffect } from "react";

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

    <section className="promptContainer">
      <div className="wrapper">
        <form action="submit">
          <label htmlFor="newMusings">
            <p>Your prompt for the day...</p>
            {<h4>{displayPrompts}</h4>}
          </label>
          <textarea
            type="text"
            id="newMusings"
            onChange={handleChange}
            value={userInput}
          />

          {/* Moods bar */}
          <label htmlFor="moodWrapper">
            <h4>How are you feeling today?</h4>
          </label>

          <div className="moodWrapper">
            <label htmlFor="happy" className="visually-hidden">
              happy mood
            </label>
            <input
              type="image"
              src="/assets/grin-regular.svg"
              alt="happy face line drawing"
              className="mood"
              onClick={handleMood}
              value="happy"
              id="happy"
            ></input>

            <label htmlFor="love" className="visually-hidden">
              love mood
            </label>
            <input
              type="image"
              src="/assets/grin-hearts-regular.svg"
              alt="happy face with heart eyes line drawing"
              className="mood"
              onClick={handleMood}
              value="love"
              id="love"
            ></input>

            <label htmlFor="excited" className="visually-hidden">
              excited mood
            </label>
            <input
              type="image"
              src="/assets/grin-stars-regular.svg"
              alt="excited face line drawing"
              className="mood"
              onClick={handleMood}
              value="excited"
              id="excited"
            ></input>

            <label htmlFor="whatever" className="visually-hidden">
              whatever mood
            </label>
            <input
              type="image"
              src="/assets/meh-rolling-eyes-regular.svg"
              alt="indifferent face line drawing"
              className="mood"
              onClick={handleMood}
              value="whatever"
              id="whatever"
            ></input>

            <label htmlFor="angry" className="visually-hidden">
              angry mood
            </label>
            <input
              type="image"
              src="/assets/angry-regular.svg"
              alt="angry face line drawing"
              className="mood"
              onClick={handleMood}
              value="angry"
              id="angry"
            ></input>

            <label htmlFor="shocked" className="visually-hidden">
              shocked mood
            </label>
            <input
              type="image"
              src="/assets/dizzy-regular.svg"
              alt="shocked face line drawing"
              className="mood"
              onClick={handleMood}
              value="shocked"
              id="shocked"
            ></input>

            <label htmlFor="tired" className="visually-hidden">
              tired mood
            </label>
            <input
              type="image"
              src="/assets/tired-regular.svg"
              alt="tired face line drawing"
              className="mood"
              onClick={handleMood}
              value="tired"
              id="tired"
            ></input>

            <label htmlFor="sad" className="visually-hidden">
              sad mood
            </label>
            <input
              type="image"
              src="/assets/tired-regular.svg"
              alt="sad face line drawing"
              className="mood"
              onClick={handleMood}
              value="sad"
              id="sad"
            ></input>
          </div>
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