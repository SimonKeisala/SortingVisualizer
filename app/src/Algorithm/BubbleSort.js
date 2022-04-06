import AbstractSort from "./AbstractSort"


class BubbleSort extends AbstractSort {
    sort(array) {
        for (let end = array.length - 1; end >= 0; --end) {
            for (let i = 0; i < end; ++i) {
                if (this.gt(array, i, i + 1)) {
                    this.swap(array, i, i + 1);
                }
            }
        }
    }
}
export default BubbleSort;