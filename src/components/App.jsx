import React, { useState } from 'react';
import flightsResponse from '../data/flights.json';
import FlightCards from './FlightCards';
import Sort from './Sort';
import Languages from './Languages';

const App = () => {
  const [flights, setFlights] = useState(flightsResponse.result.flights);
  const [activeLang, setActiveLang] = useState('ru');

  const [filters, setFilters] = useState({
    noTransfers: false,
    minPrice: null,
    maxPrice: null,
  });

  return (
    <>
      <div>
        <Languages activeLang={activeLang} setActiveLang={setActiveLang} />
      </div>
      <div className="app-container">
        <Sort
          flights={flights}
          setFlights={setFlights}
          setFilters={setFilters}
        />
        <FlightCards
          flights={flights}
          filters={filters}
          activeLang={activeLang}
        />
      </div>
    </>
  );
};

export default App;
