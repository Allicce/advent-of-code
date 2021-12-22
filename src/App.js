import './App.css';
import React, { Component } from 'react'
import {exercise_41, exercise_42} from "./day21/day21";







class App extends Component {
    componentDidMount() {
        exercise_42()
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
