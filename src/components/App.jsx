import React, { useState } from 'react';
import flightsResponse from '../data/flights.json';
import FlightCards from './FlightCards';
import Sort from './Sort';

const App = () => {
  const [flights, setFlights] = useState(flightsResponse.result.flights);
  const [filters, setFilters] = useState({
    noTransfers: false,
    minPrice: null,
    maxPrice: null,
  });

  return (
    <>
      <Sort flights={flights} setFlights={setFlights} setFilters={setFilters} />
      <FlightCards flights={flights} filters={filters} />
    </>
  );
};

export default App;
