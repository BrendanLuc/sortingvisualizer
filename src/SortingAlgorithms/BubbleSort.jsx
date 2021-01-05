export function getBubbleSortAnimations(array) {
    const animations = [];
    n = array.length();
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; i < n-i-1; j++) {
            animations.push([j, j+1]);
            if (array[j] > array[j+1]) {
                // swap
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = array[j];
                animations.push([i, j]);
            }
            animations.push([i, j])
        }
    }
    return animations;
}