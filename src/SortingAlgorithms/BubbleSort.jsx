export function getBubbleSortAnimations(array) {

    const animations = [];
    if (array.length <= 1) return array;

    bubbleSort(array, animations);

    return animations;

    // console.log(array)
}

function swap(j, array) {
    // swap
    let temp = array[j];
    array[j] = array[j+1];
    array[j+1] = temp;
}

function bubbleSort(array, animations) {
    let arrayLength = array.length;
    for (let i = 0; i < arrayLength - 1; i++) {
        for (let j = 0; j < arrayLength - i - 1; j++) {
            // animations.push([j, j+1])
            if (array[j] > array[j+1]) {
                swap(j, array);
                animations.push([j, j+1, true]);
            }
            else animations.push([j, j+1, false]);
        }
    }
    // console.log("ARRAY")
    // console.log(array);
}