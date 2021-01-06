import React from 'react';
import './SortingVisualizer.css';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort.js'

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
            //generates ARR_SIZE random numbers for array
            array.push(randomIntFromInterval(VIS_MIN,VIS_MAX));
        }
        this.setState({array});
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //selection sort
    async animateSelectionSort(){

        const animations = getSelectionSortAnimations(this.state.array);

        for(let i = 0; i < animations.length; ++i){
            let arrayBars = document.getElementsByClassName('array-bar');
            
            //get indexes and styles of bars
            const [firstBar, secondBar] = animations[i];
            let firstStyle = arrayBars[firstBar].style;
            let secondStyle = arrayBars[secondBar].style;

        
            //first step: highlight compared items
            //console.log("ORANGE");
            firstStyle.backgroundColor = SECONDARY_COLOR;
            secondStyle.backgroundColor = SECONDARY_COLOR;
            await this.sleep(ANIMATION_SPEED_MS);


            //second step: change heights
            const newHeight = firstStyle.height;
            firstStyle.backgroundColor = SWAP_COLOR;
            secondStyle.backgroundColor = SWAP_COLOR;
            firstStyle.height = secondStyle.height;
            secondStyle.height = newHeight;
            await this.sleep(ANIMATION_SPEED_MS);
            
            

            //third step: unhighlight items 
            //console.log("BLUE");
            firstStyle.backgroundColor = PRIMARY_COLOR;
            secondStyle.backgroundColor = PRIMARY_COLOR;
        
            


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
