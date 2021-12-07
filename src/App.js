import './App.css';
import React, { Component } from 'react'
import {exercise_13} from "./day7/day7";






class App extends Component {
    componentDidMount() {
        exercise_13()
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
