import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Alart from './components/Alart';
const axios = require('axios');

function App() {
  var [persons, setPersons] = useState([]);
  var [oldPersons, setOldPersons] = useState(persons);
  var [newName, setNewName] = useState('');
  var [newNumber, setNewNumber] = useState('');
  var [alart, setAlart] = useState({
    color: 'green',
    visibility: false,
    msg: ''
  });

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
        showAlert('green', 'Added '+newName);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        showAlert('red', error.response.data.message);
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
          console.log(error.response.data.message);
          showAlert('red', error.response.data.message);
        })
      
      persons[index].number = newNumber;
        setPersons(persons);
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
        console.log(error.response.data.message);
        showAlert('red', error.response.data.message);
      })
    }
  }

  const showAlert = (color, msg) =>{
    alart = {
      color: color,
      visibility: true,
      msg: msg,
    }
    setAlart(alart);
    window.setTimeout(()=>{
      alart = {
        color: color,
        visibility: false,
        msg: msg,
      }
      setAlart(alart);
    },2000)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Alart alart={alart}/>
      <Filter handleOnChange={handleOnChange}/>

      <h2>Add a new</h2>
      <PersonForm submitForm={submitForm} handleInputChange={handleInputChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} deleteUser={deleteUser}/>
    </div>
  )
}
 
export default App
