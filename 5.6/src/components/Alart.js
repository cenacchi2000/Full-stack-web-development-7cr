import React from "react";
function Alart(props){
    return(
        <div>
            {props.alart.visibility ? (
                <h2 style={{backgroundColor: '#b6b4b4', color:props.alart.color, border:'2px solid '+props.alart.color, padding:'5px'}}>{props.alart.msg}</h2>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Alart;
