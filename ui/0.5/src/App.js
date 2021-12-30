import React, { useState, useEffect } from 'react';
const axios = require('axios');

function App() {
  var [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/api/notes').then(res => 
    {
      notes = [];
      notes = res.data;
      setNotes(notes);
    })
    .catch(function (error) {
      console.log(error);
    })
    
  },[])
 
  return (
    <div style={{border: '1px solid black', padding: '10px'}}>
      <h1>Notes</h1>

      <ul>
      {notes.map(function(note, i){
        return (<li key={i} style={{color: 'blue'}}>{note.note}</li>);
      })}
      </ul>
    </div>
  )
}
 
export default App
