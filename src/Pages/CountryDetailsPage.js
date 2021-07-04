import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//styled components
import styled from "styled-components";
//router
import { useLocation, useHistory } from "react-router-dom";
const CountryDetailsPage = () => {
  //state
  const [country, setCountry] = useState({});
  const location = useLocation();
  const history = useHistory();
  const alpha2Code = location.pathname.split("/")[2];
  //handler
  const fetchData = async () => {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${alpha2Code}`
    );
    return res.data;
  };
  //useEffect
  useEffect(() => {
    fetchData().then(({ name, currencies, capital }) =>
      setCountry({ name: name, currencies: currencies, capital: capital })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CountryComponent>
      <h1>{country.name}</h1>
      <ul>
        <li>
          Capital: <b>{country.capital}</b>
        </li>
        {country.currencies && country.currencies.length > 1 && (
          <li>Currencies:</li>
        )}
        {country.currencies && (
          <ul className="currencies">
            {country.currencies.map((currency, index) => (
              <div key={index}>
                <li>
                  Currency code: <b>{currency.code}</b>
                </li>
                <li>
                  Currency name: <b>{currency.name}</b>
                </li>
                <li>
                  {" "}
                  Currency symbol: <b>{currency.symbol}</b>
                </li>
              </div>
            ))}
          </ul>
        )}
      </ul>
      <button className="btn" onClick={() => history.goBack()}>
        Go back
      </button>
    </CountryComponent>
  );
};

const CountryComponent = styled.div`
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    text-align: center;
  }
  ul {
    list-style: none;
  }
  .currencies {
    list-style-position: outside;
  }
`;

export default CountryDetailsPage;
