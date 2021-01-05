export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    selectionSort(array, animations);
    
    return animations;
}

function swap(i, j){
    let temp = array[i]; 
    array[i] = array[j];
    array[j] = temp;
}

function selectionSort(array, animations){
    
    let arrLen = array.length();

    for(let i = 0 ; i < arrLen; ++i){

        let idx = i;

        for(let j = 0; j < arrLen - i; ++j){
            if(array[j] < array[i]) {
                idx = j;
            }
        }

        swap(i, j);
        animations.push(i, j);
    }
}