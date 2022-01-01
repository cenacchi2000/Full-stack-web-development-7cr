import React,{useState,useEffect} from 'react';
import dbData from "../db.json";

function PersonsData() {
    var [data,setData]=useState([]);
    useEffect(()=>{
        data = dbData;
        setData(data);
        console.log(data.persons[0].name);
    },[])
    return (
        <div>
            <p>hi</p>
            <p></p>
        </div>
    );
}

export default PersonsData;