import './App.css';
import React, { Component } from 'react'
import {exercise_31, exercise_32} from "./day16/day16";







class App extends Component {
    componentDidMount() {
        exercise_32()
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
