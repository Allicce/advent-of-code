import './App.css';
import '../src/utilities/strings'
import React, {Component} from 'react'
import {part_one, part_two} from "./2022/day8/day8";

class App extends Component {
  componentDidMount() {
    // part_one()
    part_two()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Advent of code
        </header>
      </div>
    );
  }

}

export default App;
