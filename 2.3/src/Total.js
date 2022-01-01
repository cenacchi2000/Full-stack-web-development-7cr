import React from "react";

function Total(props){
    const parts = props.parts;
    return(
        <>
            <b>Total of {parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises}</b>
        </>
    )
}

export default Total;