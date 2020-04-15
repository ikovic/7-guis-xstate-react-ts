import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Counter from "./tasks/counter/Counter";
import TemperatureConverter from "./tasks/temperatureConverter/TemperatureConverter";
import FlightBooker from "./tasks/flightBooker/FlightBooker";
import Timer from "./tasks/timer/Timer";
import Crud from "./tasks/crud/Crud";

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
            <li>
              <Link to="/timer">Timer</Link>
            </li>
            <li>
              <Link to="/crud">CRUD</Link>
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
            I lied - only the <strong>first five</strong> tasks will be solved
            here. Final two tasks use specific widgets more related to desktop
            GUI programming. Seems a bit out of scope for what I'm trying to
            learn here.
          </p>
          <p>
            Zero effort was invested in making this look nice. Same approach was
            applied to general code quality, with the exception of state
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
            <Route path="/timer">
              <Timer />
            </Route>
            <Route path="/crud">
              <Crud />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
