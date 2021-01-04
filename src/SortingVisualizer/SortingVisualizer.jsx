import React from 'react';
import './SortingVisualizer.css';

const VIS_MIN = 5
const VIS_MAX = 650
const ARR_SIZE = 100

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    //when app loads, reset array 
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < ARR_SIZE; ++i){
            //generates 100 random numbers for array
            array.push(randomIntFromInterval(VIS_MIN,VIS_MAX));
        }
        this.setState({array});
    }

    render(){
        const {array} = this.state;

        return (
            <div className="big-container">
                <button type="button" class="btn btn-primary" onClick={() => this.resetArray()}>Generate New Numbers</button>

                <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}>
                
                    </div>
                ))}
                </div>
            </div>
        );
    }

}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
