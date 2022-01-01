import React from "react";

function Persons(props){
    return(
        <>
        {props.persons.map(function(person, i){
          return (<p key={i}>{person.name} {person.number}</p>);
        })}
        </>
    )
}

export default Persons;