import './App.css';
import React, { Component } from 'react'
import {exercise_6} from "./day3/day3";



class App extends Component {
    componentDidMount() {
        exercise_6()
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
