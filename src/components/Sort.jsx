import React from 'react';

const sortOptions = {
  asc: (a, b) => a.flight.price.total.amount - b.flight.price.total.amount,
  desc: (a, b) => b.flight.price.total.amount - a.flight.price.total.amount,
  duration: (a, b) => a.flight.legs[0].duration - b.flight.legs[0].duration,
};

const Sort = ({ flights, setFlights, setFilters }) => {
  const sortFlights = (sortType) => {
    const sorted = [...flights].sort((a, b) => {
      return sortOptions[sortType](a, b);
    });
    setFlights(sorted);
  };

  const handleChangeSort = (e) => {
    sortFlights(e.target.value);
  };

  const handleChangeFilter = (e) => {
    const isNoTransferOn = e.target.checked;
    setFilters((prev) => ({ ...prev, noTransfers: isNoTransferOn }));
  };

  const handleChangePriceMin = (e) => {
    const minPrice = e.target.value === '' ? null : Number(e.target.value);
    console.log(minPrice);
    setFilters((prev) => ({ ...prev, minPrice }));
  };

  const handleChangePriceMax = (e) => {
    const maxPrice = e.target.value === '' ? null : Number(e.target.value);
    console.log(maxPrice);
    setFilters((prev) => ({ ...prev, maxPrice }));
  };

  return (
    <aside className="sort-aside">
      <form>
        <fieldset className="sort-field">
          <legend className="sort-field-title">Sort by:</legend>
          <ul className="sort-list">
            <li className="sort-item">
              <label className="sort-label" htmlFor="ascending-price">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort-radio"
                  id="ascending-price"
                  value="asc"
                  onChange={handleChangeSort}
                  defaultChecked
                />
                - ascending prices
              </label>
            </li>
            <li className="sort-item">
              <label className="sort-label" htmlFor="descending-price">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort-radio"
                  id="descending-price"
                  value="desc"
                  onChange={handleChangeSort}
                />
                - descending prices
              </label>
            </li>
            <li className="sort-item">
              <label className="sort-label" htmlFor="duration-sort">
                <input
                  className="sort-radio"
                  type="radio"
                  name="sort-radio"
                  id="duration-sort"
                  value="duration"
                  onChange={handleChangeSort}
                />
                - travel duration
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset className="filter-field">
          <legend className="filter-field-title">Filter by:</legend>
          <ul className="filter-list">
            <li className="filter-item">
              <label className="filter-label" htmlFor="no-transfer">
                <input
                  className="filter-checkbox"
                  type="checkbox"
                  name="filter-no-transfers"
                  id="no-transfer"
                  onChange={handleChangeFilter}
                />
                - no transfers
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset className="filter-price-field">
          <legend className="filter-price-field-title">Price:</legend>
          <ul className="filter-price-list">
            <li className="filter-price-item">
              <label className="filter-price-label" htmlFor="price-filter-min">
                <span>From</span>
                <input
                  className="filter-price-input"
                  type="number"
                  name="filter-price-min"
                  id="price-filter-min"
                  onChange={handleChangePriceMin}
                />
              </label>
            </li>
            <li className="filter-price-item">
              <label className="filter-price-label" htmlFor="price-filter-max">
                <span>To</span>
                <input
                  className="filter-price-input"
                  type="number"
                  name="filter-price-max"
                  id="price-filter-max"
                  onChange={handleChangePriceMax}
                />
              </label>
            </li>
          </ul>
        </fieldset>
      </form>
    </aside>
  );
};

export default Sort;
