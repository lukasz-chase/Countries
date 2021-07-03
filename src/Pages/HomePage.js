import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [sort, setSort] = useState(true);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/name/united")
      .then(({ data }) => setCountriesList(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(countriesList);
  return (
    <AppComponent>
      <h1>Countries list</h1>
      <button className="btn" onClick={() => setSort(!sort)}>
        Sort by name
      </button>
      <ul>
        {countriesList
          .sort((a, b) =>
            sort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
          )
          .map((country, index) => (
            <li key={index}>
              <Link to={`/country/${country.alpha2Code}`} className="link">
                {country.name}
              </Link>
            </li>
          ))}
      </ul>
    </AppComponent>
  );
};

const AppComponent = styled.div`
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #212529;
  ul {
    list-style: none;
    li {
      padding: 0.5rem;
      .link {
        text-decoration: none;
        color: black;
      }
      &:hover {
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }
`;

export default HomePage;
