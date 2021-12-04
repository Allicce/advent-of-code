import './App.css';
import React, { Component } from 'react'
import {exercise_7} from "./day4/day4";




class App extends Component {
    componentDidMount() {
        exercise_7()
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
