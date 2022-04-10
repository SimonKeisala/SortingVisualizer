import AbstractSort from "./AbstractSort";
class InsertionSort extends AbstractSort {
    sort(array) {
        for (let i = 1; i < array.length; ++i) {
            for (let j = i; j > 0; --j) {
                if (this.lt(array, j, j - 1)) {
                    this.swap(array, j, j - 1);
                } else {
                    break;
                }
            }
        }
    }
}


export default InsertionSort;