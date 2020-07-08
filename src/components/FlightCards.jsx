import React from 'react';
import { uniqueId } from 'lodash';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ru, enUS } from 'date-fns/locale';
import airplaneLogo from '../img/airplane.png';

const FlightCards = ({ flights, filters, activeLang }) => {
  const { t } = useTranslation();

  const renderCards = (filteredFlights) => {
    if (filteredFlights.length === 0) {
      return <div className="empty-results">{`${t('Not found')} :(`}</div>;
    }
    return (
      <ul className="flight-cards">
        {filteredFlights.map(({ flight }) => {
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

          const dateLocale =
            activeLang === 'ru' ? { locale: ru } : { locale: enUS };

          return (
            <li key={uniqueId()} className="flight-card">
              <div className="catalog__card-info-wrap">
                <div className="flight-card-header">
                  <div className="airline-company-logo-wrap">
                    <img
                      className="airline-company-logo"
                      src={airplaneLogo}
                      alt="airline company logo"
                    />
                  </div>
                  <div className="price-wrap">
                    <b className="price">{`${flight.price.total.amount} ₽`}</b>
                    <p className="price-info">{`${t('Adult cost info')}`}</p>
                  </div>
                </div>
                <div className="flight-card-body">
                  <div className="flight-segments">
                    <p className="flight-departure-info">
                      {`${departureCity}, ${departureAirport} (${departureAirportCode})`}
                    </p>
                    <span className="flight-segments-arrow">⟶</span>
                    <p className="flight-arrival-info">{`${arrivalCity}, ${arrivalAirport} (${arrivalAirportCode})`}</p>
                  </div>
                  <hr />
                  <div className="flight-dates-wrap">
                    <div className="departure-date">
                      <span className="departure-time">
                        {format(new Date(departureDate), 'HH:mm')}
                      </span>
                      {format(
                        new Date(departureDate),
                        'dd LLLL EEE',
                        dateLocale,
                      )}
                    </div>
                    <div className="flight-duration">
                      {`🕑 ${Math.floor(duration / 60)} ${t('Hours')} ${
                        duration % 60
                      } ${t('Minutes')}`}
                    </div>
                    <div className="arrival-date">
                      {format(new Date(arrivalDate), 'dd LLLL EEE', dateLocale)}
                      <span className="arrival-time">
                        {format(new Date(arrivalDate), 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <div className="carrier-wrap">
                    <p className="carrier-info">
                      {`${t('Carrier info')}: ${flight.carrier.caption}`}
                    </p>
                  </div>
                  <button type="button" className="flight-card-btn">
                    {t('Select')}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const applyFilters = () => {
    let filteredFlights = Object.assign(flights, {});

    if (filters.noTransfers) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.legs[0].segments.length === 1,
      );
    }
    if (filters.minPrice) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.price.total.amount >= filters.minPrice,
      );
    }
    if (filters.maxPrice) {
      filteredFlights = filteredFlights.filter(
        ({ flight }) => flight.price.total.amount <= filters.maxPrice,
      );
    }
    return renderCards(filteredFlights);
  };

  return <div className="flight-cards-wrapper">{applyFilters()}</div>;
};

export default FlightCards;
