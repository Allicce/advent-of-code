import './App.css';
import React, { Component } from 'react'
import {exercise_4} from "./day2/day2";


class App extends Component {
    componentDidMount() {
        exercise_4()
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
