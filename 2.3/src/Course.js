import React from "react";
import Part from "./Part";
import Total from "./Total";
function Course(props){
    const parts = props.course.parts;
    return(
        <>
        <h1>{props.course.name}</h1>
        {parts.map((part, key) => (
            <Part key={key} part={part.name} exercises={part.exercises}/>
        ))}
        <Total parts = {parts}/>
      </>
    )
}

export default Course;