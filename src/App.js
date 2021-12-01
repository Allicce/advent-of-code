import './App.css';
import React, { Component } from 'react'
import {exercise_2} from "./day1/day1";

class App extends Component {
    componentDidMount() {
        exercise_2()
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
