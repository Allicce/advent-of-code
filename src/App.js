import './App.css';
import React, { Component } from 'react'
import {exercise_21} from "./day11/day11";







class App extends Component {
    componentDidMount() {
        exercise_21()
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
