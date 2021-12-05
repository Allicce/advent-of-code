import './App.css';
import React, { Component } from 'react'
import {exercise_9} from "./day5/day5";





class App extends Component {
    componentDidMount() {
        exercise_9()
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
