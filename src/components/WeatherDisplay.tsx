import React, { useState, useEffect } from 'react';
import { fetchWeatherData, WeatherData } from '../API/OpenWeatherApi';
import moment from 'moment';  

interface WeatherProps {
  location: string;
}

const WeatherDisplay: React.FC<WeatherProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

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
  const advisoryText = isWarm
    ? 'Area is warm for beekeeping'
    : 'Area is cold/cloudy/rainy for beekeeping, do not go and see them';
  const backgroundStyle = {
    backgroundImage: isWarm
      ? 'url(./public/img/bees_sun.jpg)'
      : 'url(./public/img/clouds_cold.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  const currentYear = new Date().getFullYear();

  return (
    <div className="h-screen bg-cover bg-no-repeat" style={backgroundStyle}>
    <div 
    className="max-w-md 
              p-8 mx-auto 
              rounded-lg 
              bg-gray-900 
              text-gray-100 
              bg-opacity-80 grid place-items-center ">
      <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-24 h-24 p-2 text-yellow-400 fill-current">
            {/* SVG content */}
          </svg>
          <h1 className="text-xl font-semibold">{weather.name}</h1>
        </div>
        <span className="font-bold text-6xl ">{weather.main.temp}°C</span>
      </div>
      <div className="flex justify-between mt-8 space-x-4 text-gray-400">
        {/* Other content */}
      </div>
      <div className="advisory" >
        <p className='text-5xl font-bold'>{advisoryText}</p>
        <br />
        <p>{moment().format('YYYY/MM/DD, h:mm a')}</p>
        <br />
      <br />

      <p className='font-thin'>
        Created by <a href="https://kagishoph.co.za">kagishoph.co.za</a> , {currentYear} &copy;
      </p>
      </div>
      
    </div>
    </div>
  );
}

export default WeatherDisplay;
