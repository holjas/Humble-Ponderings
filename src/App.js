import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [prompts, setPrompts] = useState([]);
  const [displayPrompts, setDisplayPrompts] = useState("");
  const [userInput, setUserInput] = useState("");

  //captures the text input values
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };
  //submits the input to the database
  const handleClick = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref().child("musings");
    dbRef.push(userInput);
    setUserInput("");

    console.log("IAM PROMPTS", prompts);
    setPrompts(prompts[randomNumber(prompts)]);
  };

  //grabs from database on mount
  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const responsePrompts = response.val().prompts;
      // console.log(responsePrompts);
      // console.log(response.val().musings);

      const newPromptsState = [];

      for (const key in responsePrompts) {
        newPromptsState.push(responsePrompts[key]);
      }
      setPrompts(newPromptsState);
      // console.log(newPromptsState, "NEWPROMPT STATE");
      console.log("newprompt length", newPromptsState.length);
    });
  }, []);

  const randomNumber = () => {
    const number = Math.floor(Math.random() * 4);
    // console.log("random number length", array.length);
    // console.log("random number", number);
    return number;
  };

  return (
    <div className="App">
      <h1>our new thing 🤔☁☁️🧠💜</h1>
      <h2>{prompts}</h2>

      <form action="submit">
        <label htmlFor="newMusings">Put a thought there</label>
        <input
          type="text"
          id="newMusings"
          onChange={handleChange}
          value={userInput}
        />
        <button onClick={handleClick}>im a button</button>
      </form>
    </div>
  );
}

export default App;
