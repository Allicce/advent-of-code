import './App.css';
import React, { Component } from 'react'
import {exercise_29, exercise_30} from "./day15/day15";







class App extends Component {
    componentDidMount() {
        exercise_30()
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
