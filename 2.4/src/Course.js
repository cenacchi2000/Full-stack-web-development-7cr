import React from "react";
import Part from "./Part";
import Total from "./Total";

function Course(props){
    const courses = props.course;
    return(
        <>
        <h1>Web development curriculum</h1>
            {courses.map((course, ind) => (
                <>
                <h1 key={ind}>{course.name}</h1>
                {course.parts.map((part, key) => (
                    <Part key={key} part={part.name} exercises={part.exercises}/>
                ))}
                <Total parts = {course.parts}/>
                </>
            ))}  
        </>
    )
}

export default Course;