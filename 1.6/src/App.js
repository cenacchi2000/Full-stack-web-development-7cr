import React ,{ useState } from "react";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = () => {
    setGood(good +1)
  }

  const countNeutral = () => {
    setNeutral(neutral +1)
  }

  const countBad = () => {
    setBad(bad +1)
  }

  return (
    <div>
	  <h1>Give Feedback</h1>
      <button type="button" onClick={countGood}>Good</button>
      <button type="button" onClick={countNeutral}>Neutral</button>
      <button type="button" onClick={countBad}>Bad</button>
      <>
        <h1>Statistics: </h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </>
    </div>

  );
}

export default App;
