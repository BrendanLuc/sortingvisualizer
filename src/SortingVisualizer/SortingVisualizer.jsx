import React from 'react';
import './SortingVisualizer.css';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.jsx';
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort.jsx';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort.js'
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js'

const VIS_MIN = 5
const VIS_MAX = 650
const ARR_SIZE = 100
const ANIMATION_SPEED_MS = 10

const PRIMARY_COLOR = '#6cc3d5'
const SECONDARY_COLOR = '#fd7e14'
const SWAP_COLOR = '#56cc9d'

export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            array: [],
            running: false,
            cycle: 0,
            newState:false, //true means array hasn't been sorted het
        };
    }

    //when app loads, reset array
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        this.setState({newState: true});
        this.setState({running: false});
        this.setState({cycle: this.state.cycle + 1});
        const array = [];
        for(let i = 0; i < ARR_SIZE; ++i){
            //generates ARR_SIZE random numbers for array
            array.push(randomIntFromInterval(VIS_MIN,VIS_MAX));
        }
        this.setState({array})

    }

    resetArrayFromClick(){
        //reset bar opacity
        this.resetArray();
        let arrayBars = document.getElementsByClassName('array-bar');
        for(let j = 0; j < ARR_SIZE; ++j){
            arrayBars[j].style.opacity = "100%";
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //selection sort
    toggleRunning(){
        this.setState(state => ({running: !this.state.running}));
    }

    //cause time sucks
    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    async animateSelectionSort(){
        //check if sorting has already happened for these numbers
        if(!this.state.newState) return;
        
        //true copy so we can check and update state values
        let sortedArray = Array.from(this.state.array);
        const animations = getSelectionSortAnimations(sortedArray);

        await this.setStateAsync({newState: false});
        await this.setStateAsync({running: true});
        let cycle = this.state.cycle;

        for(let i = 0; i < animations.length; ++i){

            while(!this.state.running) await this.sleep(10); //user paused the animation, loop until played (is there a better way to do this?)
            if(this.state.cycle !== cycle) return; //user reset the numbers, quit animation

            let arrayBars = document.getElementsByClassName('array-bar');

            //get indexes and styles of bars
            const [firstBar, secondBar, swap] = animations[i];
            let firstStyle = arrayBars[firstBar].style;
            let secondStyle = arrayBars[secondBar].style;

                 //first step: highlight compared items
                //console.log("ORANGE");
                firstStyle.backgroundColor = SECONDARY_COLOR;
                secondStyle.backgroundColor = SECONDARY_COLOR;
                await this.sleep(ANIMATION_SPEED_MS);

            if(swap){
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
                if(this.state.newState) return;
                firstStyle.opacity = '50%';
                await this.sleep(ANIMATION_SPEED_MS);
            }
            else{
                firstStyle.backgroundColor = PRIMARY_COLOR;
                secondStyle.backgroundColor = PRIMARY_COLOR;
            }
           


        }
        this.setState({array: sortedArray});
        await this.setStateAsync({running: false});

    }
    //bubble sort
    async animateBubbleSort() {
        //check if sorting has already happened for these numbers
        if(!this.state.newState) return;
        
        //true copy so we can check and update state values
        let sortedArray = Array.from(this.state.array);
        const animations = getBubbleSortAnimations(sortedArray);

        await this.setStateAsync({newState: false});
        await this.setStateAsync({running: true});
        let cycle = this.state.cycle;
       // console.log("CYCLE: " + cycle);

        // console.log(animations);
        // console.log(animations.length)
        for (let i = 0; i < animations.length; i++) {

            while(!this.state.running) await this.sleep(10); //user paused the animation, loop until played (is there a better way to do this?)
            if(this.state.cycle !== cycle) return; //user reset the numbers, quit animation

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
        this.setState({array: sortedArray});
        await this.setStateAsync({running: false});
    }

    //insertion sort
    async animateInsertionSort() {
        //check if sorting has already happened for these numbers
        await this.sleep(ANIMATION_SPEED_MS);
        if(!this.state.newState) return;
        
        //true copy so we can check and update state values
        let sortedArray = Array.from(this.state.array);
        const animations = getInsertionSortAnimations(sortedArray);

        await this.setStateAsync({newState: false});
        await this.setStateAsync({running: true});
        let cycle = this.state.cycle;
        // console.log(animations);

        for (let i = 0; i < animations.length; i++) {

            while(!this.state.running) await this.sleep(10); //user paused the animation, loop until played (is there a better way to do this?)
            if(this.state.cycle !== cycle) return; //user reset the numbers, quit animation

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
        //console.log("SORTED!!!")
        this.setState({array: sortedArray});
        await this.setStateAsync({running: false});
    }

    //merge sort
    async animateMergeSort(){

        //check if sorting has already happened for these numbers
        await this.sleep(ANIMATION_SPEED_MS);
        if(!this.state.newState) return;
        
        //true copy so we can check and update state values
        let sortedArray = Array.from(this.state.array);
        const animations = getMergeSortAnimations(sortedArray);

        await this.setStateAsync({newState: false});
        await this.setStateAsync({running: true});
        let cycle = this.state.cycle;
        //console.log(animations);

        for(let i = 0; i < animations.length; ++i){

            while(!this.state.running) await this.sleep(10); //user paused the animation, loop until played (is there a better way to do this?)
            if(this.state.cycle !== cycle) return; //user reset the numbers, quit animation

            let arrayBars = document.getElementsByClassName('array-bar');

            //get indexes and styles of bars
            const [firstBar, secondBar, swap] = animations[i];
            let firstStyle = arrayBars[firstBar].style;
            let secondStyle = arrayBars[secondBar].style;


            //check if second needs to be pushed up
            if(swap){ //do animations for each swap
                    const newHeight = firstStyle.height;

                    firstStyle.height = secondStyle.height;
                    secondStyle.height = newHeight;

                    firstStyle.backgroundColor = PRIMARY_COLOR;
                    secondStyle.backgroundColor = PRIMARY_COLOR;

            }
            else{ //bar is fine, move on, change colors back
                firstStyle.backgroundColor = SECONDARY_COLOR;
                secondStyle.backgroundColor = SECONDARY_COLOR;
                await this.sleep(ANIMATION_SPEED_MS);
                firstStyle.backgroundColor = PRIMARY_COLOR;
                secondStyle.backgroundColor = PRIMARY_COLOR;
            }

        }
        this.setState({array: sortedArray});
        await this.setStateAsync({running: false});
    }

    //fixme: quicksort later
    //fixme: heapsort?


    render(){
        const {array} = this.state;

        return (
            <div className="big-container">
                <button type="button" className="btn btn-primary" onClick={() => this.resetArrayFromClick()}>Generate New Numbers</button>
                <button type="button" className="btn btn-secondary" disabled={!this.state.newState} onClick={() => this.animateBubbleSort()}>Bubble Sort</button>
                <button type="button" className="btn btn-info" disabled={!this.state.newState} onClick={() => this.animateInsertionSort()}>Insertion Sort</button>
                <button type="button" className="btn btn-warning" disabled={!this.state.newState} onClick={() => this.animateSelectionSort()}>Selection Sort</button>
                <button type="button" className="btn btn-danger" disabled={!this.state.newState} onClick={() => this.animateMergeSort()}>Merge Sort</button>
                {this.state.newState ? null : <button type="button" className="btn btn-outline-secondary" onClick={() => this.toggleRunning()}>{this.state.running ? 'PAUSE' : 'PLAY'}</button>}

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
