import React from 'react';

const sortOptions = {
  asc: (a, b) => a.flight.price.total.amount - b.flight.price.total.amount,
  desc: (a, b) => b.flight.price.total.amount - a.flight.price.total.amount,
  duration: (a, b) => b.flight.legs[0].duration - a.flight.legs[0].duration,
};

const Sort = ({ flights, setFlights }) => {
  const sortFlights = (sortType) => {
    const sorted = [...flights].sort((a, b) => {
      return sortOptions[sortType](a, b);
    });
    setFlights(sorted);
  };

  const changeSort = (e) => {
    sortFlights(e.target.value);
  };

  return (
    <aside>
      <form>
        <fieldset className="sort-field">
          <legend className="sort-field-title">Sort by:</legend>
          <ul className="sort-type-list">
            <li className="sort-type-item">
              <label className="sort-type-label" htmlFor="ascending-price">
                <input
                  className="sort-type-radio"
                  type="radio"
                  name="sort-type"
                  id="ascending-price"
                  value="asc"
                  onChange={changeSort}
                  defaultChecked
                />
                ascending prices
              </label>
            </li>
            <li className="sort-type-item">
              <label className="sort-type-label" htmlFor="descending-price">
                <input
                  className="sort-type-radio"
                  type="radio"
                  name="sort-type"
                  id="descending-price"
                  value="desc"
                  onChange={changeSort}
                />
                descending prices
              </label>
            </li>
            <li className="sort-type-item">
              <label className="sort-type-label" htmlFor="duration-sort">
                <input
                  className="sort-type-radio"
                  type="radio"
                  name="sort-type"
                  id="duration-sort"
                  value="duration"
                  onChange={changeSort}
                />
                travel duration
              </label>
            </li>
          </ul>
        </fieldset>
      </form>
    </aside>
  );
};

export default Sort;
