import './App.css';
import React, { Component } from 'react'
import {exercise_33} from "./day17/day17";







class App extends Component {
    componentDidMount() {
        exercise_33()
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
