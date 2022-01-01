import React from "react";

function PersonForm(props){
    return(
        <form onSubmit={props.submitForm}>
        <div>
          Name: <input type="text" className="form-control" name="name" id="name" onChange={props.handleInputChange} />
          <br/>
          <br/>
          Number: <input type="text" className="form-control" name="number" id="number" onChange={props.handleInputChange} />
          <br/>
          <br/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;
