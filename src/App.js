import "./DeleteStyles.css";
// REMEMBER TO DELETE THIS CONNECTION
import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

import Musings from "./Musings";
import Footer from "./Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinAlt, faGrinHearts, faGrinStars, faMehRollingEyes, faAngry, faDizzy, faTired, faSadCry } from '@fortawesome/free-regular-svg-icons'



function App() {
  const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");
  const [musings, setMusings] = useState([]);
  const [mood, setMood] = useState('');
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
    setCountMusings(countMusings + 1);
  };

  //button to generate random prompt
  const handleRandom = (e) => {
    e.preventDefault();
    const promptLength = prompts.length;
    setDisplayPrompts(prompts[randomNumber(promptLength)]);
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
    const selectedMood=(e.target.id)
    setMood(selectedMood);
  }

  // remove musing
  const removeMusing = (props) => {
    const userId = `-MY23fP9h4gvOjL_I7-0`;
    firebase.database().ref("musings/" + userId);
    // dbRef.("musings").remove();
    console.log('clicked!')
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
          <p className="moodText">Add a feel</p>
          <div className="moodWrapper">
            <div className="mood"><FontAwesomeIcon icon={faGrinAlt} onClick={handleMood} value="happy" id="happy"/></div>
            <div className="mood"><FontAwesomeIcon icon={faGrinHearts} onClick={handleMood} value="love" id="love"/></div>
            <div className="mood"><FontAwesomeIcon icon={faGrinStars} onClick={handleMood} value="excited" id="excited"/></div>
            <div className="mood"><FontAwesomeIcon icon={faMehRollingEyes} onClick={handleMood} value="whatever" id="whatever"/></div>
            <div className="mood"><FontAwesomeIcon icon={faAngry} onClick={handleMood} value="angry" id="angry"/></div>
            <div className="mood"><FontAwesomeIcon icon={faDizzy} onClick={handleMood} value="shocked" id="shocked"/></div>
            <div className="mood"><FontAwesomeIcon icon={faTired} onClick={handleMood} value="tired" id="tired"/></div>
            <div className="mood"><FontAwesomeIcon icon={faSadCry} onClick={handleMood} value="Sad" id="sad"/></div>
          </div>
          <button onClick={handleClick}>im a button</button>
          <button onClick={handleRandom}>generate a new prompt</button>
        </form>

      <section className="musingContainer wrapper">
        <Musings musingState={musings} removeMusing={removeMusing}/>
      </section>

      <Footer />
    </div>
  );
}

export default App;