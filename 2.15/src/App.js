import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
const axios = require('axios');

function App() {
  var [persons, setPersons] = useState([]);
  var [oldPersons, setOldPersons] = useState(persons);
  var [newName, setNewName] = useState('');
  var [newNumber, setNewNumber] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:3001/api/persons').then(res => 
    {
      persons = [];
      persons = res.data;
      setPersons(persons);
      oldPersons = res.data;
      setOldPersons(oldPersons);
    })
    .catch(function (error) {
      console.log(error);
    })
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
    console.log(index);
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
      <h2>Phonebook {newName}</h2>
      <Filter handleOnChange={handleOnChange}/>

      <h2>Add a new</h2>
      <PersonForm submitForm={submitForm} handleInputChange={handleInputChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}
 
export default App
