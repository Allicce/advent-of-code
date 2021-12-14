import './App.css';
import React, { Component } from 'react'
import {exercise_27, exercise_28} from "./day14/day14";







class App extends Component {
    componentDidMount() {
        exercise_28()
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
