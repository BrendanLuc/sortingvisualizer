import React from 'react';
import './SortingVisualizer.css';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.jsx';
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort.jsx';


const VIS_MIN = 5
const VIS_MAX = 650
const ARR_SIZE = 100
const ANIMATION_SPEED_MS = 500

const PRIMARY_COLOR = '#6cc3d5'
const SECONDARY_COLOR = '#fd7e14'
const SWAP_COLOR = '#56cc9d'


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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //selection sort
    animateSelectionSort(){

    }
    //bubble sort
    async animateBubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        // console.log(animations);
        // console.log(animations.length)
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            // get indexes and styles of array values
            let [firstBar, secondBar, isSwap] = animations[i];
            let firstBarStyle = arrayBars[firstBar].style;
            let secondBarStyle = arrayBars[secondBar].style

            // highlight values being compared
            // SECONDAY_COLOR shows comparison, SWAP_COLOR displayed if there is a swap
            firstBarStyle.backgroundColor = SECONDARY_COLOR;
            secondBarStyle.backgroundColor = SECONDARY_COLOR;
            await this.sleep(ANIMATION_SPEED_MS);

            // show swap if there is one
            if (isSwap) {
                firstBarStyle.backgroundColor = SWAP_COLOR;
                secondBarStyle.backgroundColor = SWAP_COLOR;
                const newHeight = firstBarStyle.height;
                firstBarStyle.height = secondBarStyle.height;
                secondBarStyle.height = newHeight;
                await this.sleep(ANIMATION_SPEED_MS);
            }

            // unhighlight
            firstBarStyle.backgroundColor = PRIMARY_COLOR;
            secondBarStyle.backgroundColor = PRIMARY_COLOR;
            await this.sleep(ANIMATION_SPEED_MS);
        }
        console.log("SORTED!!!")
    }

    //insertion sort
    async animateInsertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        // console.log(animations);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');

            // get indexes and styles of array values
            let [firstBar, secondBar, isSwap] = animations[i];
            let firstBarStyle = arrayBars[firstBar].style;
            let secondBarStyle = arrayBars[secondBar].style

            // highlight values being compared
            // SECONDAY_COLOR shows comparison, SWAP_COLOR displayed if there is a swap
            firstBarStyle.backgroundColor = SECONDARY_COLOR;
            secondBarStyle.backgroundColor = SECONDARY_COLOR;
            await this.sleep(ANIMATION_SPEED_MS);

            // show swap if there is one
            if (isSwap) {
                firstBarStyle.backgroundColor = SWAP_COLOR;
                secondBarStyle.backgroundColor = SWAP_COLOR;
                const newHeight = firstBarStyle.height;
                firstBarStyle.height = secondBarStyle.height;
                secondBarStyle.height = newHeight;
                await this.sleep(ANIMATION_SPEED_MS);
            }

            // unhighlight
            firstBarStyle.backgroundColor = PRIMARY_COLOR;
            secondBarStyle.backgroundColor = PRIMARY_COLOR;
            await this.sleep(ANIMATION_SPEED_MS);
        }
        console.log("SORTED!!!")
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
                <button type="button" class="btn btn-primary" onClick={() => this.animateInsertionSort()}>Insertion Sort</button>

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
