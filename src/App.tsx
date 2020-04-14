import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Counter from "./tasks/counter/Counter";
import TemperatureConverter from "./tasks/temperatureConverter/TemperatureConverter";
import FlightBooker from "./tasks/flightBooker/FlightBooker";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="application">
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
            <li>
              <Link to="/temperature-converter">Temperature Converter</Link>
            </li>
            <li>
              <Link to="/flight-booker">Flight Booker</Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <h1>7GUIs tasks</h1>
          <p>
            Solutions to{" "}
            <a href="https://eugenkiss.github.io/7guis/tasks">7GUIs</a> using
            React, TypeScript and XState.
          </p>
          <p>
            Zero effort was invested in making this look nice. Same approach was
            applied to general code quality, with the exception of the state
            management code which was the focus of this work.
          </p>
          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
            <Route path="/temperature-converter">
              <TemperatureConverter />
            </Route>
            <Route path="/flight-booker">
              <FlightBooker />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
