import './App.css';
import React, { Component } from 'react'
import {exercise_17} from "./day9/day9";







class App extends Component {
    componentDidMount() {
        exercise_17()
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
