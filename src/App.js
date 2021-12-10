import './App.css';
import React, { Component } from 'react'
import {exercise_19} from "./day10/day10";







class App extends Component {
    componentDidMount() {
        exercise_19()
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
