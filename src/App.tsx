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
   <div className="App">
      <div className="my-4">
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleLocationSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Enter
        </button>
      </div>
      <WeatherDisplay location={submitLocation} />
    </div>
  );
}

export default App;
