export function getBubbleSortAnimations(array) {

    const animations = [];
    console.log(array)
    let n = array.length();

    for (let i = 0; i < n-1; i++) {
        // i is for the elements already sorted at the end
        for (let j = 0; i < n-i-1; j++) {
            // the two values we are comparing
            animations.push([j, j+1]);
            // the two values we are comparing
            if (array[j] > array[j+1]) {
                // swap
                // temp = array[j];
                // array[j] = array[j+1];
                // array[j+1] = array[j];
                animations.push([j+1, j]);
            }
            else {
                // no swap
                animations.push([j, j+1]);
            }
        }
    }
    return animations;
}