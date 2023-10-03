// src/App.tsx
import React from 'react';
import WeatherDisplay from '../src/components/WeatherDisplay';  

const App: React.FC = () => {
  return (
    <div className="App">
      {/* Location must be Hard coded */}
      <WeatherDisplay location='Pretoria' /> 
    </div>
  );
}

export default App;
