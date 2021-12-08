import './App.css';
import React, { Component } from 'react'
import {exercise_15} from "./day8/day8";







class App extends Component {
    componentDidMount() {
        exercise_15()
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
