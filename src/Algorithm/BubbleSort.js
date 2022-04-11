import AbstractSort from "./AbstractSort"


class BubbleSort extends AbstractSort {
    sort(array) {
        let swapped = true;
        let last_change = 0;
        let end = array.length - 1
        while (swapped) {
            swapped = false;
            for (let i = 0; i < end; ++i) {
                if (this.gt(array, i, i + 1)) {
                    this.swap(array, i, i + 1);
                    last_change = i;
                    swapped = true;
                }
            }
            end = last_change;
        }
    }
}
export default BubbleSort;