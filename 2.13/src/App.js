import React, { useState, useEffect } from 'react';

function App() {
  var [countries, setCountries] = useState([]);
  var [more, setMore] = useState(false);
  var [single, setSingle] = useState(false);
  var [singlecountry, setSinglecountry] = useState(false);
  var [selected, setSelected] = useState(false);
  var [selectedcountry, setSelectedcountry] = useState(false);

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
              singlecountry = countries[0];
              setSinglecountry(singlecountry);
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
    selected = false;
    setSelected(selected);
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

      {selected ? (
        <div>
          <h2>{selectedcountry.name.official}</h2>
          <br/>
          <p>capital {selectedcountry.capital}</p>
          <p>population {selectedcountry.population}</p>

          <h4>languages</h4>
          <ul>
          {Object.keys(selectedcountry.languages).map(function(language, i){
            <li key={i}>{language}</li>
          })}
          </ul>
          
          <img src={selectedcountry.flags.png} alt="flag"/>
        </div>
      ) : (
        <div>
          {more ? (
            <p>Too many matches, specify another filter.</p>
          ) : (
            <div>
              {single ? (
                <div>
                  <h2>{singlecountry.name.official}</h2>
                  <br/>
                  <p>capital {singlecountry.capital}</p>
                  <p>population {singlecountry.population}</p>

                  <h4>languages</h4>
                  <ul>
                  {Object.keys(singlecountry.languages).map(function(language, i){
                    <li key={i}>{language}</li>
                  })}
                  </ul>
                  
                  <img src={singlecountry.flags.png} alt="flag"/>
                </div>
              ) : (
                <div>
                  {countries.map(function(country, i){
                    return (<p key={i}>{country.name.official} <button type="button" onClick={() => { selectedcountry = countries[i]; setSelectedcountry(selectedcountry); selected = true; setSelected(selected); }}>view</button></p>);
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
 
export default App
