import React, { useState } from 'react';
import flightsResponse from '../data/flights.json';
import FlightCards from './FlightCards';
import Sort from './Sort';

const App = () => {
  const [flights, setFlights] = useState(flightsResponse.result.flights);

  return (
    <>
      <Sort flights={flights} setFlights={setFlights} />
      <FlightCards flights={flights} />
    </>
  );
};

export default App;
