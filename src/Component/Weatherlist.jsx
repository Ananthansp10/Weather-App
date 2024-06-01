import React from 'react'
import '../Component/Weatherlist.css'
function Weatherlist({data}) {
  return (
    (data.map((data,index)=>(
     <div className='weatherlist'>
        {index <7 &&
        <div className="content">
            <div className="date">
                <p className='bold'>Date</p>
                <p className='bold'>{data.dt_txt.slice(0,10)}</p>
            </div>
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
      </div>
     }
    </div>
    )))
  )
}

export default Weatherlist
