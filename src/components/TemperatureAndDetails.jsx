import React from 'react'
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { iconURLFromCode , formatToLocalTime } from '../services/weatherService';

function TemperatureAndDetails({
  weather:{
    details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone
  }
}) {
  return (
    <div>
        <div className='flex items-center justify-center py- text-xl text-cyan-500'>
            <p>{details}</p>
         </div>

 <div className='flex flex-row justify-around items-center text-white py-3'>
 <img src={iconURLFromCode(icon)}
alt=""
className='w-20'>
</img> 

<p className='text-5xl'>{`${temp.toFixed()}`}°</p>
<div className='felx flex-col
space-y-2'>
<div className='flex  font-light text-sm items-center justify-center'>
  <UilTemperature size={18} className="mr-1 "/>
  Real fell:
  <span className='font-sm ml-1' >{`${feels_like.toFixed()}°`}</span>
  </div>
  <div className='flex  font-light text-sm items-center justify-center'>
  <UilTear size={18} className="mr-1 "/>
  Humidity:
  <span className='font-sm ml-1' >{`${humidity.toFixed()}%`}</span>
  </div>
  <div className='flex  font-light text-sm items-center justify-center'>
  <UilWind size={18} className="mr-1 "/>
  Wind:
  <span className='font-sm ml-1' >{`${speed.toFixed()}Km/h`}</span>
  </div>
  
</div>
</div>
<div className='flex flex-row item-center justify-center text-white text-sm py-3'>
<UilSun/>
<p className='font-light'>Rise: <span className='font-md ml-1'>{formatToLocalTime(sunrise,timezone,"hh:mm a")}</span></p>
<p className='font-light ml-2'>|</p>
<UilSunset/>
<p className='font-light'>Set: <span className='font-md ml-1'>{formatToLocalTime(sunset,timezone,"hh:mm a")}</span></p>
<p className='font-light ml-2'>|</p>
<UilArrowUp/>
<p className='font-light'>High: <span className='font-md ml-1'>{`${temp_max.toFixed()}`}</span></p>
<p className='font-light ml-2'>|</p>
<UilArrowDown/>
<p className='font-light'>Low: <span className='font-md ml-1'>{`${temp_min.toFixed()}`}</span></p>

</div>
</div>  

 


  );
}

export default TemperatureAndDetails