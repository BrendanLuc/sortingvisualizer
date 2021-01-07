export function getInsertionSortAnimations(array) {

    const animations = [];
    if (array.length <= 1) return array;

    insertionSort(array, animations);

    return animations;
}


function swap(j, array) {
    // swap
    let temp = array[j];
    array[j] = array[j+1];
    array[j+1] = temp;
}

function insertionSort(array, animations) {
    let arrayLength = array.length;

    for (let i = 1; i < arrayLength; i++) {
        let compareValue = array[i];
        let j = i - 1;
        // animations.push([j, j+1, false]);
        while (j >= 0 && array[j] > compareValue) {
            swap(j, array)
            animations.push([j, j+1, true]);
            j = j - 1;
        }
        // console.log(j)
        if (j < 0) {
            // console.log("BEINGING OF LIST, DO NOTHING")
        }
        else {
            //show comparison when you dont have to move a bar, when its in final place
            animations.push([j, j+1, false]);
        }
        array[j + 1] = compareValue;
    }
    // console.log("ARRAY")
    // console.log(array)
    // console.log("SORTED")
}