import './App.css';
import React, { Component } from 'react'
import {exercise_11} from "./day6/day6";





class App extends Component {
    componentDidMount() {
        exercise_11()
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
