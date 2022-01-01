import React from "react";

function Total(props){
    return(
        <>
            <b>Total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises + props.parts[3].exercises} exercises</b>
        </>
    )
}

export default Total;