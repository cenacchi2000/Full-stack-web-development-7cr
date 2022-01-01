import React, { useState, useEffect } from 'react'

function App() {
  var [persons, setPersons] = useState([
	{ name: 'Arto Hellas' }
  ]);
  var [newName, setNewName] = useState('');
  
  useEffect(()=>{
    persons = [
		{ name: 'Arto Hellas' }
    ]
    setPersons(persons);
  },[])

  const handleInputChange = (e) => {
    const { value } = e.target;
    newName = value;
    setNewName(newName);
  };

  const submitForm = (e) =>{
    e.preventDefault();
    let index = persons.findIndex(row => row.name === newName);
    console.log(index);
    if(index < 0){
      let newPerson = { name: newName };
      persons.push(newPerson);
      setPersons(persons);
    }else{
      alert(newName+" is already added to phonebook");
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitForm}>
        <div>
          name: <input type="text" className="form-control" name="name" id="name" onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(function(person, i){
        return (<p key={i}>{person.name}</p>);
      })}
    </div>
  )
}
 
export default App
