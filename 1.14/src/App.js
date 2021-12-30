import React ,{ useState, useEffect } from "react";

function App() {
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const [selected, setSelected] = useState(0)
  let maxVote = {anecdote: '', vote: 0};
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 7, 4: 0, 5: 0, 6: 0 })
  const [vote, setVote] = useState(0)
  const pointsCopy = {...points}

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const selectRandom = () => {
    setSelected(random(0, anecdotes.length))
  }

  const giveVote = ()=> {
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    setVote(pointsCopy[selected]);
  }

  const findMax = () => {
    let max = -1, maxIndex = 0; 
    for(let i = 0; i < anecdotes.length; i++){
      if(pointsCopy[i] > max){
        maxIndex = i;
        max = pointsCopy[i];
      }
    }
    
    maxVote = {anecdote: anecdotes[maxIndex], vote: pointsCopy[maxIndex]}
  }

  findMax();
  
  useEffect(() => {
    setVote(pointsCopy[selected]);

  },[selected]);

  useEffect(() => {
    findMax();

  },[vote, findMax]);
   

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {vote} votes</p>
      <button type="button" onClick={giveVote}>Vote</button>
      <button type="button" onClick={selectRandom}>Next Anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{maxVote.anecdote}</p>
      <p>Has {maxVote.vote} votes</p>
    </div>
    
  );
}

export default App;
