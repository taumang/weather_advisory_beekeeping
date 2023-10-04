import React,{useState} from 'react';
import WeatherDisplay from '../src/components/WeatherDisplay';  

const App: React.FC = () => {

  const [location,setLocation] = useState('Pretoria,South Africa');
  const [submitLocation,setSubmitLocation] = useState('Pretoria,South Africa');

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  
  const handleLocationSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    setSubmitLocation(location);
  };

  return (
   <div className="App bg-gray-600">
      <div className="relative ">
  <label htmlFor="location-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Enter location</label>
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
    </svg>
  </div>
  <input
    type="text"
    id="location-input"
    value={location}
    onChange={handleLocationChange}
    placeholder="Enter location"
    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />
  <button
    onClick={handleLocationSubmit}
    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Enter
  </button>
  
</div>
<WeatherDisplay location={submitLocation} />
    </div>
  );
}

export default App;
