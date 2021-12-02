import { Redirect, Route, Switch } from "react-router";
import "./App.scss";
import MainContextProvider from "./Component/Context/MainContext";
import Dashboard from "./Component/Dashboard/Dashboard";
import LoginPage from "./Component/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route
          path="/dashboard"
          render={() => (
            <MainContextProvider>
              <Dashboard />
            </MainContextProvider>
          )}
        />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
