import React from "react";

function Persons(props){
    return(
        <>
        {props.persons.map(function(person, i){
          return (<p key={person.id}>{person.id} {person.name} {person.number} <button type="button" onClick={(e) => props.deleteUser(person.id, person.name, e)}>delete</button></p>);
        })}
        </>
    )
}

export default Persons;