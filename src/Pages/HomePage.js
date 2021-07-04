import React, { useEffect, useState } from "react";
//axios
import axios from "axios";
//styled components
import styled from "styled-components";
//router
import { Link } from "react-router-dom";
//material ui
import Pagination from "@material-ui/lab/Pagination";

const HomePage = () => {
  //state
  const [countriesList, setCountriesList] = useState([]);
  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  //useEffect
  useEffect(() => {
    if (!search) {
      axios
        .get("https://restcountries.eu/rest/v2/name/united")
        .then(({ data }) => {
          const res = data.map(({ name, alpha2Code }) => ({
            name: name,
            alpha2Code: alpha2Code,
          }));
          setCountriesList(res);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then((res) => setCountriesList(res.data))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  //handlers
  const pagesHandler = (e, v) => {
    setPage(v);
    window.scrollTo(0, 0);
  };
  return (
    <AppComponent>
      <h1>Countries list</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search country"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn" onClick={() => setSort(!sort)}>
        Sort by name
      </button>
      <ul>
        {countriesList
          .sort((a, b) =>
            sort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
          )
          .slice(page > 1 ? page * 20 : 0, page * 20 + 20)
          .map((country, index) => (
            <Link
              to={`/country/${country.alpha2Code}`}
              className="link"
              key={index}
            >
              <li>{country.name}</li>
            </Link>
          ))}
      </ul>

      <Pagination
        count={Math.round(countriesList.length / 20)}
        color="primary"
        className="choosePage"
        onChange={pagesHandler}
      />
    </AppComponent>
  );
};

const AppComponent = styled.div`
  min-height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #212529;
  h1 {
    text-align: center;
  }
  .search-input {
    padding: 0.5rem;
    border-radius: 5rem;
    &:focus {
      outline: none;
    }
  }
  ul {
    list-style: none;
    .link {
      text-decoration: none;
      color: black;
    }
    li {
      padding: 0.5rem;
      &:hover {
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }
`;

export default HomePage;
