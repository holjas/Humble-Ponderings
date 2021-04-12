import "./DeleteStyles.css";
// REMEMBER TO DELETE THIS CONNECTION
import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

import Header from "./Header";
import Prompts from "./Prompts";
import Musings from "./Musings";
import Footer from "./Footer";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [musings, setMusings] = useState([]);

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
    <div className="App appWrapper">
      <p>DELETETHIS{(displayPrompts, prompts)}</p>
      <Header />

      <Prompts prompts={prompts} />

      <Musings musingState={musings} />

      <Footer />
    </div>
  );
}

export default App;
