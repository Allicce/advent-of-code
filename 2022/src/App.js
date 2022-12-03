import './App.css';
import React, { Component } from 'react'
import {part_one, part_two} from "./day3/day3";

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
