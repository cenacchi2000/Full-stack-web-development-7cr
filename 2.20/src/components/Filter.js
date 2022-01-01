import React from "react";

function Filter(props){
    return(
        <form>
            <div>
                Filter shown with <input type="text" className="form-control" name="name" id="name" onChange={props.handleOnChange} />
            </div>
        </form>
    )
}

export default Filter;
