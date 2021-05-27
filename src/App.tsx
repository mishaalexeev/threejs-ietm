import React, { FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "routes";

const App: FC = () => {
  const routesComponents = routes.map((route) => {
    return (
      <Route
        path={route.url}
        component={route.component}
        exact={route.exact}
        key={route.url}
      />
    );
  });
  return (
    <div className="App">
      <Router>
        <Switch>{routesComponents}</Switch>
      </Router>
    </div>
  );
};

export default App;
