import React, { useState, useEffect } from 'react';
const axios = require('axios');

function App() {
  var [notes, setNotes] = useState([]);
  var [newNote, setNewNote] = useState('');

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

  const handleInputChange = (e) => {
    const { value } = e.target;
    newNote = value;
    setNewNote(newNote);
  };

  const submitForm = (e) =>{
    axios.post('http://localhost:3001/api/notes', {
        note: newNote
      }).then(res => 
      {
        let note = res.data;
        notes.push(note);
        setNotes(notes);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      })
  }
 
  return (
    <div style={{border: '1px solid black', padding: '10px'}}>
      <h1>Notes</h1>

      <ul>
      {notes.map(function(note, i){
        return (<li key={i} style={{color: 'blue'}}>{note.note}</li>);
      })}
      </ul>

      <form onSubmit={submitForm}>
        <div>
          <input type="text" name="note" id="note" onChange={handleInputChange} />
          <br/>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
 
export default App
