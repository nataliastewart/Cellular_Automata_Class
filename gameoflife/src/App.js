import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
