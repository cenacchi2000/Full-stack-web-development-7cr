import React, { useState, useEffect } from 'react';

function App() {
  var [countries, setCountries] = useState([]);
  var [more, setMore] = useState(false);
  var [single, setSingle] = useState(false);

  useEffect(()=>{
    search();
  },[])

  const search = (name) => {
    if (name) {
      fetch("https://restcountries.com/v3.1/name/"+name)
      .then(res => res.json())
      .then((data) => {
        if(data.status === 404){
          single = false;
          setSingle(single);
          countries = [];
          setCountries(countries);
          more = false;
          setMore(more);
        }else{
          setCountries(data)

          if(data.length > 10){
            single = false;
            setSingle(single);
            more = true;
            setMore(more);
          }else{
            if(data.length === 1){
              single = true;
              setSingle(single);
            }else{
              single = false;
              setSingle(single);
            }
            
            more = false;
            setMore(more);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }else{
      countries = [];
      setCountries(countries);
    }
  }

  const handleOnChange = async (e) => {
    let value = e.target.value;
    search(value);
  }
 
  return (
    <div>
      <h2>country</h2>
      <form>
        <div>
          Find countries <input type="text" className="form-control" name="name" id="name" onChange={handleOnChange} />
        </div>
      </form>

      {more ? (
        <p>Too many matches, specify another filter.</p>
      ) : (
        <div>
          {single ? (
            <div>
              <h2>{countries[0].name.official}</h2>
              <br/>
              <p>capital {countries[0].capital}</p>
              <p>population {countries[0].population}</p>

              <h4>languages</h4>
              <ul>
              {Object.keys(countries[0].languages).map(key => (
                <li>{countries[0].languages[key]}</li>
              ))}
              </ul>
              
              <img src={countries[0].flags.png} alt="flag"/>
            </div>
          ) : (
            <div>
              {countries.map(function(country, i){
                return (<p key={i}>{country.name.official}</p>);
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
 
export default App
