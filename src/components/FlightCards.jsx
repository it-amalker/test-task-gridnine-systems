import React from 'react';
import { uniqueId } from 'lodash';
import { format } from 'date-fns';

const FlightCards = ({ flights }) => {
  console.log(flights);

  const renderCards = () => {
    return (
      <ul className="flight-cards">
        {flights.map(({ flight }) => {
          console.log(flight);
          const { segments, duration } = flight.legs[0];
          const lastSegmentIndex = segments.length - 1;
          const departureCity = segments[0].departureCity.caption;
          const departureAirport = segments[0].departureAirport.caption;
          const departureAirportCode = segments[0].departureAirport.uid;

          const arrivalCity = segments[lastSegmentIndex].arrivalCity.caption;
          const arrivalAirport =
            segments[lastSegmentIndex].arrivalAirport.caption;
          const arrivalAirportCode =
            segments[lastSegmentIndex].arrivalAirport.uid;

          const { departureDate } = segments[0];
          const { arrivalDate } = segments[lastSegmentIndex];

          return (
            <li key={uniqueId()} className="flight-card">
              <div className="catalog__card-info-wrap">
                <div className="flight-card-header">
                  <img
                    className="airline-company-logo"
                    alt="airline company logo"
                  />
                  <div className="price-wrap">
                    <b className="price">{flight.price.total.amount}</b>
                    <p className="price-info">
                      The cost for one adult passenger
                    </p>
                  </div>
                </div>
                <div className="flight-card-body">
                  <div className="flight-segments">
                    <p className="flight-departure-info">
                      {`${departureCity}, ${departureAirport} (${departureAirportCode})`}
                    </p>
                    →
                    <p className="flight-arrival-info">{`${arrivalCity}, ${arrivalAirport} (${arrivalAirportCode})`}</p>
                    <hr />
                  </div>
                  <div>
                    <div className="departure-date">
                      {format(new Date(departureDate), 'HH:mm dd LLLL EEE')}
                    </div>
                    <div className="flight-duration">
                      {`${Math.floor(duration / 60)} h ${duration % 60} min`}
                    </div>
                    <div className="arrival-date">
                      {format(new Date(arrivalDate), 'dd LLLL EEE HH:mm')}
                    </div>
                  </div>
                  <div className="airline-company-info-wrap">
                    <p className="airline-company-info">
                      {`Flight performed by: ${flight.carrier.caption}`}
                    </p>
                  </div>
                  <button type="button" className="flight-card-btn">
                    Select
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return flights.length > 0 ? renderCards() : <div>Nothing was found :(</div>;
};

export default FlightCards;
