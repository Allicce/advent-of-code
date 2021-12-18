import './App.css';
import React, { Component } from 'react'
import {exercise_23} from "./day12/day12";







class App extends Component {
    componentDidMount() {
        exercise_23()
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
