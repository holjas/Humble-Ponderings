import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

import Header from "./Header";
import Prompts from "./Prompts";
import Musings from "./Musings";
import Footer from "./Footer";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [musings, setMusings] = useState([]);

  //grabs from database on mount
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const responsePrompts = response.val().prompts;
      const newPromptsState = [];
      const responseMusings = response.val().musings;
      const newMusingsState = [];

      //setting prompts into prompt state
      for (const key in responsePrompts) {
        newPromptsState.push(responsePrompts[key]);
      }
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

  return (
    <div className="App">
      <Header />
      <Prompts prompts={prompts} />
      <Musings musingState={musings} />
      <Footer />
    </div>
  );
}

export default App;
