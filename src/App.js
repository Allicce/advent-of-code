import './App.css';
import React, { Component } from 'react'
import {exercise_39} from "./day20/day20";







class App extends Component {
    componentDidMount() {
        exercise_39()
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
