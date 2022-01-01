import React, { useState, useEffect } from 'react'

function App() {
  var [persons, setPersons] = useState([
	{
	  name: 'Arto Hellas',
	  number: '040-1234567'
	}
  ]);
  var [newName, setNewName] = useState('');
  var [newNumber, setNewNumber] = useState('');
  
  useEffect(()=>{
    persons = [
		{
		  name: 'Arto Hellas',
		  number: '040-1234567'
		}
    ]
    setPersons(persons);
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === 'name'){
      newName = value;
      setNewName(newName);
    }else{
      newNumber = value;
      setNewNumber(newNumber);
    }
  };

  const submitForm = (e) =>{
    e.preventDefault();
    let index = persons.findIndex(row => row.name === newName);
    if(index < 0){
      let newPerson = {
        name: newName,
        number: newNumber
      };
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
          Name: <input type="text" className="form-control" name="name" id="name" onChange={handleInputChange} />
          <br/>
          <br/>
          Number: <input type="text" className="form-control" name="number" id="number" onChange={handleInputChange} />
          <br/>
          <br/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(function(person, i){
        return (<p key={i}>{person.name} {person.number}</p>);
      })}
    </div>
  )
}
 
export default App
