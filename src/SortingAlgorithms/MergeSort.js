export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    console.log(array);
    mergeSort(array, 0, array.length-1, animations);
    console.log(array);

    return animations;
}

function swap(i, j, array){
    let temp = array[i]; 
    array[i] = array[j];
    array[j] = temp;
}

function mergeSort(array, l, r, animations){
    console.log("left: " + l + " right: " + r);
    if(l < r){
        let mid = Math.floor(l + (r - l) / 2);
        mergeSort(array, l, mid, animations);
        mergeSort(array, mid+1, r, animations);

        merge(array, l, r, mid, animations);

    }
}

function merge(array, l, r, mid, animations){
    console.log("MERGING: " + l + " -> " + r );
    let first = l;
    let middle = mid;
    let second = mid+1;

    while(first <= middle && second <= r){
        //first in right spot
        if(array[first] < array[second]){
            first++;
        }
        else{ //second needs to come up
            //array.splice(start, 0, array[second]);
            //array.splice(second, 1);
            
            let num = array[second]
            let j = second; //[ ... , i , j , ...]
            let i = second - 1;
            while(array[first] != num){
                console.log("\tswap: " + i + " <-> " + j );
                swap(i, j, array);
                animations.push([i, j]);
                i--; j--;
            }

            first++;
            second++;
            middle++;
        }
    }
}