import AbstractSort from "./AbstractSort"

class SelectionSort extends AbstractSort {
    sort(array) {
        for (let i = 0; i < array.length - 1; ++i) {
            let best = i;
            for (let j = i + 1; j < array.length; ++j) {
                if (this.lt(array, j, best)) {
                    best = j;
                }
            }
            this.swap(array, i, best);
        }
    }
}

export default SelectionSort;