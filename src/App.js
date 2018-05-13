import React, { Component } from "react";
import MapView from "./components/MapView";
import Map from "./logic/Map";
import "./App.css";
import Selector from "./components/Selector";

let myMap;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Treasure Finder!</h1>
        </header>
        <div className="Box">
          <MapView />
          <Selector />
        </div>
      </div>
    );
  }
}

export default App;
