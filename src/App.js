import React, {useState} from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b6d9d38a90696b50356e7993f7b5d4f7`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      }).catch((error) => {
        alert(error.response.data.message)
      })
      setLocation(event.target.value);
    }
  }

  
  let unix_timestamp1 = data.sys?data.sys.sunrise:null
  let unix_timestamp2 = data.sys?data.sys.sunset:null

  let date1 = new Date(unix_timestamp1 * 1000);
  let date2 = new Date(unix_timestamp2 * 1000);

  let sunrise = date1.toLocaleTimeString("en-US");
  let sunset = date2.toLocaleTimeString("en-US");

  return (
    <div className="App">
      <div className='search'>
        <input type='text' 
          onChange={(event) => setLocation(event.target.value)} 
          onKeyPress={searchLocation} 
          value={location}
          placeholder='Enter City Name'/>
      </div>
      {
          data.name != undefined && 
        <div className='container'>

      
          <div className='top'>
            <div className='location'>
              <p>{data.name} {data.sys?data.sys.country:null}</p>
            </div>
            <div className='temp'>
              {data.main?<h1>{((data.main.temp - 32) * 5 / 9).toFixed()}&#8451;</h1>: null}
            </div>
            <div className='riseSet'>
              <h2>Sunrise {sunrise}</h2>
              <h2>Sunset {sunset}</h2>
            </div>
            <div className='description'>
              {data.weather?<p>{data.weather[0].description}</p>: null}
            </div>
          </div>

            
  
            <div className='bottom'>
              <div className='feels'>
              {data.main?<p className='bold'>{((data.main.feels_like- 32) * 5 / 9).toFixed()}&#8451;</p>: null}
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
              {data.main?<p className='bold'>{data.main.humidity}%</p>: null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
              {data.wind?<p className='bold'>{data.wind.speed.toFixed()} MPH</p>: null}
                <p>Wind Speed</p>
              </div>
            </div>
          

        </div>
      }
    </div>
  );
}

export default App;
