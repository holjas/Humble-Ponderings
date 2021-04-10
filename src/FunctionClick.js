import React, {useState} from 'react'

function FunctionClick() {
  const [display, setDisplay]= useState(false)

  function toggleDisplay(e){
    e.preventDefault();
    setDisplay(!display)
  }

  return (
    <div>
      <h1 className={display?"show":"hidden"}>Thank you!</h1>
      <button onClick={toggleDisplay}>Click</button>
    </div>
  );
}

export default FunctionClick
