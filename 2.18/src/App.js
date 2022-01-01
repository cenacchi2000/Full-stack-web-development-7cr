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
    if(index < 0){
      axios.post('http://localhost:3001/api/persons', {
        name: newName,
        number: newNumber
      }).then(res => 
      {
        let newPerson = res.data;
        persons.push(newPerson);
        setPersons(persons);
        oldPersons = persons;
        setOldPersons(oldPersons);
      })
      .catch(function (error) {
        console.log(error);
      })
    }else{
      if (window.confirm("name is already added to phonebook, replace te old number with a new one?")) {
        axios.put('http://localhost:3001/api/persons/'+persons[index].id, {
          number: newNumber
        }).then(res => 
        {
          persons[index].number = newNumber;
          setPersons(persons);
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }
  }

  const deleteUser = (id, name) =>{
    if (window.confirm("Delete "+name+" ?")) {
      axios({
        method: 'delete',
        url: 'http://localhost:3001/api/persons/'+id,
        headers: {"Access-Control-Allow-Origin": "*"}
      })
      .then(res => {
        setPersons(prev => prev.filter((el) => el.id !== id));
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={handleOnChange}/>

      <h2>Add a new</h2>
      <PersonForm submitForm={submitForm} handleInputChange={handleInputChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} deleteUser={deleteUser}/>
    </div>
  )
}
 
export default App
