import AbstractSort from "./AbstractSort"


class ShellSort extends AbstractSort {
    sort(array) {
        let step = Math.floor(array.length);
        while (step > 0) {
            for (let i = step; i < array.length; ++i) {
                let j = i;
                while (j - step >= 0 && this.lt(array, j, j - step)) {
                    this.swap(array, j, j - step);
                    j -= step;
                }
            }
            step = Math.floor(step / 2);
        }
    }
}
export default ShellSort;