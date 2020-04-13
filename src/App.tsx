import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Counter from "./tasks/Counter";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
