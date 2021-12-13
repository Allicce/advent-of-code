import './App.css';
import React, { Component } from 'react'
import {exercise_25} from "./day13/day13";







class App extends Component {
    componentDidMount() {
        exercise_25()
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
