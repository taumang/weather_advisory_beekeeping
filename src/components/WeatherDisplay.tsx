import React, { useState, useEffect } from 'react';
import { fetchWeatherData, WeatherData } from '../Services/API/OpenWeatherApi';
import moment from 'moment';  

interface WeatherProps {
  location: string;
}

const WeatherDisplay: React.FC<WeatherProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  //The geolocation has been replaced with the search bar in the App.tsx
  
  useEffect(() => {
    const fetchData = async () => {
      if (!location) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const data = await fetchWeatherData(`${position.coords.latitude},${position.coords.longitude}`);
            setWeather(data);
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
        return;
      }
      const data = await fetchWeatherData(location);
      setWeather(data);
    };
    
    fetchData();
  }, [location]);

  if (!weather || typeof weather.main === 'undefined') return null;

  const isWarm = weather.main.temp > 15;

  const locationName: unknown = weather.name;// had to define the weather.name as unknown
  const myLocationName = locationName as React.ReactNode;

  const advisoryText = isWarm
    ? 'Good Weather for Beekeeping'
    : 'Bad Weather for Beekeeping';
  const backgroundStyle = {
    backgroundImage: isWarm
      ? 'url(/img/bees_sun.jpg)'
      : 'url(/img/clouds_cold.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  const currentYear = new Date().getFullYear();

  return (
    <div >

    <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat no-scroll" style={backgroundStyle}>
    <div 
    className="max-w-md 
                p-8 
                rounded-lg 
                bg-gray-900 
                text-gray-100 
                bg-opacity-90">
      <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
         
          <h1 className="text-xl font-semibold">{myLocationName}</h1>
        </div>
        <span className="font-bold text-6xl ">{weather.main.temp}°C</span>
      </div>
      <div className="flex justify-between mt-8 space-x-4 text-gray-400">
        
      </div>
      <div className="advisory" >
        <p className='text-5xl font-bold'>{advisoryText}</p>
        <br />
        <p>{moment().format('YYYY/MM/DD, h:mm a')}</p>
        <br />
      <br />

      <p className='font-thin'>
        Created by <a href="https://kagishoph.co.za"><b>kagishoph.co.za</b></a> , {currentYear} &copy;
      </p>
      </div>
      
    </div>
    </div>
    </div>
  );
}

export default WeatherDisplay;
