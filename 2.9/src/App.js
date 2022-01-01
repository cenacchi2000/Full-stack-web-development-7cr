import React, { useState, useEffect } from 'react'

function App() {
  var [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
	{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
	{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
	{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  var [oldPersons, setOldPersons] = useState(persons);
  var [newName, setNewName] = useState('');
  var [newNumber, setNewNumber] = useState('');
  
  useEffect(()=>{
    persons = [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
      return value.name.toLowerCase().match(new RegExp(searchTerm, 'g'))
    })
  }

  const handleOnChange = async (e) => {
    let value = e.target.value;
    if (value.length > 1) {
      let search = await arraySearch(persons, value);
      setPersons(search)
    } else {
      setPersons(oldPersons)
    }
  }

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
      oldPersons = persons;
      setOldPersons(oldPersons);
    }else{
      alert(newName+" is already added to phonebook");
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with <input type="text" className="form-control" name="name" id="name" onChange={handleOnChange} />
        </div>
      </form>
      <h2>Add a new</h2>
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
