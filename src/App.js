//router
import { Route } from "react-router-dom";
//pages
import CountryDetailsPage from "./Pages/CountryDetailsPage";
import HomePage from "./Pages/HomePage";
//components
import GlobalStyles from "./Components/GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/country/:id" exact>
        <CountryDetailsPage />
      </Route>
    </div>
  );
}

export default App;
