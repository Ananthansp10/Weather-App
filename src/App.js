import { useState } from 'react';
import axios from 'axios'
import './App.css';
import Weatherlist from './Component/Weatherlist';

function App() {

  const [search,setSearch]=useState('');
  const [data,setData]=useState({});
  const [list,setList]=useState([])

  function getdetails(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
    axios.get(url).then((response)=>{
      console.log(response.data)
      const {lat,lon}=response.data.coord
      setData(response.data);
      getforecastdetails(lat,lon);
    }).catch((error)=>{
      console.log(error)
    })
  }
   function getforecastdetails(lat,lon){
    let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${process.env.REACT_APP_API_KEY}`
    axios.get(forecasturl).then((response)=>{
      console.log(response.data)
      setList(response.data.list)
    }).catch((error)=>{
      console.log(error)
    })
    setSearch('')
  }
  return (
    <div className="app">
      <div className="search">
        <input type="text" placeholder='Enter Location' onChange={(e)=>setSearch(e.target.value)} value={search}/>
        <button className='btn' onClick={getdetails}>click</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h3 className='bold'>{data.name}</h3>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1>:null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather.description}</p>:null}
          </div>
        </div>
        {data.name!==undefined ? <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p>:null}
            <p className='bold'>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p>:null}
            <p className='bold'> Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p>:null}
            <p className='bold'>Wind Speed</p>
          </div> 
        </div>:null}
        <Weatherlist data={list}/>
      </div>
    </div>
  );
  }

export default App;
