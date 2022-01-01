import React from "react";
import Part from "./Part";

function Course(props){
    const parts = props.course.parts;
    return(
        <>
        <h1>{props.course.name}</h1>
        <Part part={parts[0].name} exercises={parts[0].exercises}/>
        <Part part={parts[1].name} exercises={parts[1].exercises}/>
        <Part part={parts[2].name} exercises={parts[2].exercises}/>
      </>
    )
}

export default Course;