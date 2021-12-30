import React ,{ useState, useEffect } from "react";

function Statistics(props) {
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const {good, neutral, bad} = props

  useEffect(() => {
    setAverage((good + neutral + bad ) / 3);
    setPositive(good && (good / (bad + good ) ) * 100);
  }, [good, neutral, bad]);
  
  return (
      <>
        { good || neutral || bad ?<>
        <h1>Statistics: </h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Average: {average}</p>
        <p>Positive: {positive}%</p></>: <p>No feedback given</p>}
      </>
  )
}

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
      <>
        <h1>Give Feedback</h1>
        <button type="button" onClick={countGood}>Good</button>
        <button type="button" onClick={countNeutral}>Neutral</button>
        <button type="button" onClick={countBad}>Bad</button>
      </>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    
  );
}

export default App;
