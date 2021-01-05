import React from 'react';
import './SortingVisualizer.css';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort.js'

const VIS_MIN = 5
const VIS_MAX = 650
const ARR_SIZE = 100
const ANIMATION_SPEED_MS = 100

const PRIMARY_COLOR = '#6cc3d5'
const SECONDARY_COLOR = '#fd7e14'

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

        const animations = getSelectionSortAnimations(this.state.array);

        for(let i = 0; i < animations.length; ++i){
            let arrayBars = document.getElementsByClassName('array-bar');
            
            //get indexes and styles of bars
            const [firstBar, secondBar] = animations[i];
            let firstStyle = arrayBars[firstBar].style;
            let secondStyle = arrayBars[secondBar].style;

            //first step: highlight compared items
            setTimeout(() => {
                console.log("ORANGE");
                firstStyle.backgroundColor = SECONDARY_COLOR;
                secondStyle.backgroundColor = SECONDARY_COLOR;

            }, i * ANIMATION_SPEED_MS); 

            //second step: change heights
            setTimeout(() => {
                const newHeight = firstStyle.height;
                firstStyle.height = secondStyle.height;
                secondStyle.height = newHeight;
            }, i * ANIMATION_SPEED_MS);

            //third step: unhighlight items 
            setTimeout(() => {
                console.log("BLUE");
                firstStyle.backgroundColor = PRIMARY_COLOR;
                secondStyle.backgroundColor = PRIMARY_COLOR;

            }, i * ANIMATION_SPEED_MS);


        }

    }
    //bubble sort
    animateBubbleSort(){

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
                <button type="button" className="btn btn-primary" onClick={() => this.resetArray()}>Generate New Numbers</button>
                <button type="button" className="btn btn-secondary" onClick={() => this.animateSelectionSort()}>SelectionSort</button>

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
