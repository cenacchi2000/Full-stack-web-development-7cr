import React from "react";

function Total(props){console.log(props)
    const parts = props.parts;
    let total = 0;
    for(let part of parts){
        total += part.exercises;
    }
    return(
        <>
            <b>Total of {total} exercises</b>
        </>
    )
}

export default Total;