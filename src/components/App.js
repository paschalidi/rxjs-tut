import "./App.css";
import reactSvg from "../../public/react.svg";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-heading App-flex">
          <h2>
            Welcome to <span className="App-react">React</span>
          </h2>
        </div>
        <div className="App-instructions App-flex">
          <img className="App-logo" src={reactSvg} />
          <p>
            Edit <code>src/App.js</code> and save to hot reload your changes.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
