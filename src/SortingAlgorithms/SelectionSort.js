export function getSelectionSortAnimations(array) {
    const animations = [];

    if (array.length <= 1) return array;

    selectionSort(array, animations);
    
    return animations;
}

function swap(i, j, array){
    let temp = array[i]; 
    array[i] = array[j];
    array[j] = temp;
}

function selectionSort(array, animations){
    
    let arrLen = array.length;

    for(let i = 0 ; i < arrLen; ++i){

        let idx = i;

        for(let j = i+1; j < arrLen; ++j){
            if(array[j] < array[idx]) {
                idx = j;
            }
        }


        swap(i, idx, array);
        animations.push([i, idx]);
    }

    
    return animations;

}