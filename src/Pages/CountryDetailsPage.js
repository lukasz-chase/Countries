import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
const CountryDetailsPage = () => {
  const [country, setCountry] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const alpha2Code = location.pathname.split("/")[2];
  const fetchData = async () => {
    const res = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${alpha2Code}`
    );
    return res.data;
  };
  useEffect(() => {
    fetchData().then((data) => setCountry(data));
  }, []);
  console.log(country);
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
            {country.currencies.map((currency) => (
              <>
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
              </>
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
  ul {
    list-style: none;
  }
  .currencies {
    list-style-position: outside;
  }
`;

export default CountryDetailsPage;
