import React from 'react';
import './SortingVisualizer.css';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.jsx';


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

    animate

    //selection sort
    animateSelectionSort(){

    }
    //bubble sort
    animateBubbleSort(){
        let animations = getBubbleSortAnimations(this.render.array);
        const color1 = '#6cc3d5';
        const color2 = 'red';
        const len = animations.length;
        for (let i = 0; i < len; i++) {
            console.log('Here')
        }


    }

    //insertion sort
    animateInsertionSort(){

    }

    //merge sort
    animateMergeSort(){
        
    }

    //fixme: quicksort later
    //fixme: heapsort?


    render(){
        const {array} = this.state;

        return (
            <div className="big-container">
                <button type="button" class="btn btn-primary" onClick={() => this.resetArray()}>Generate New Numbers</button>
                <button type="button" class="btn btn-primary" onClick={() => this.animateBubbleSort()}>Bubble Sort</button>

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
