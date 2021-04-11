import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

import Musings from "./Musings";
import Footer from "./Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrin } from '@fortawesome/free-solid-svg-icons'
// import { faAngry } from '@fortawesome/free-solid-svg-icons'
// import { faDizzy } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");
  const [musings, setMusings] = useState([]);
  const [mood, setMood] = useState('');

  //captures the text input values
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  //submits the input to the database
  const handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref().child("musings");
    dbRef.push([userInput, mood]);
    setUserInput("");
  };

  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = prompts.length;
    setDisplayPrompts(prompts[randomNumber(promptLength)]);
  };

  //submits selected mood to the database
  const handleMood = (e) => {
    const selectedMood=(e.target.id)
    setMood(selectedMood);
  }


  //toggle display once user has entered information
  function toggleDisplay(e) {
    if (e.target.className === "show") {
      e.target.className = "hidden";
    } else {
      e.target.className = "show";
    }
  }

  //grabs from database on mount
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const responsePrompts = response.val().prompts;
      const newPromptsState = [];
      const responseMusings = response.val().musings;
      const newMusingsState = [];
      // const responseMood = response.val().mood;
      // const newMoodState = [];

      //setting prompts into prompt state
      for (const key in responsePrompts) {
        newPromptsState.push(responsePrompts[key]);
      }
      //set the first prompt with a random selection
      const promptLength = newPromptsState.length;
      setDisplayPrompts(newPromptsState[randomNumber(promptLength)]);
      //hold array with all prompts for future manipulations
      setPrompts(newPromptsState);

      //setting musings into musings state
      for (const key in responseMusings) {
        newMusingsState.push({
          key: key,
          musing: responseMusings[key],
        });
      }
      setMusings(newMusingsState);
    });
  }, []);

  //generate a random number
  const randomNumber = (length) => {
    const number = Math.floor(Math.random() * length);
    return number;
  };

  return (
    <div className="App">

      <h1>Humble Ponderings</h1>
      <h3>Get your thoughts out, Get your feels out</h3>
        <h2 className="show" onClick={toggleDisplay}>
          {displayPrompts}
        </h2>
        <p>{mood}</p>
        <form action="submit">
          <label htmlFor="newMusings">Put a thought there</label>
          <input
            type="text"
            id="newMusings"
            onChange={handleChange}
            value={userInput}
          />
        <div>
          <FontAwesomeIcon icon={faGrin} onClick={handleMood} value="grin" id="grin"/>
          {/* <li onClick={handleMood} value="angry"><FontAwesomeIcon icon={faAngry} /></li>
          <li onClick={handleMood} value="dizzy"><FontAwesomeIcon icon={faDizzy} /></li> */}
        </div>
        <button onClick={handleClick}>im a button</button>
        <button onClick={handleRandom}>generate a new prompt</button>
      </form>

      <div className="musingContainer">
        <Musings musingState={musings} />
      </div>
      <Footer />
    </div>
  );
}

export default App;