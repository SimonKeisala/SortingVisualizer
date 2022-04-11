import AbstractSort from "./AbstractSort"


class CoctailSort extends AbstractSort {
    sort(array) {
        let first = 0;
        let last = array.length - 1;
        let current = 0;
        let last_change = 0;
        let swapped = true;
        while (first < last) {
            swapped = false;
            while (current < last) {
                if (this.gt(array, current, current + 1)) {
                    this.swap(array, current, current + 1);
                    swapped = true;
                    last_change = current
                }
                current += 1;
            }
            if (!swapped) break;
            last = last_change;
            current = last;
            while (current > first) {
                if (this.lt(array, current, current - 1)) {
                    this.swap(array, current, current - 1);
                    swapped = true;
                    last_change = current
                }
                current -= 1;
            }
            if (!swapped) break;
            first = last_change;
            current = first;
        }
    }
}
export default CoctailSort;