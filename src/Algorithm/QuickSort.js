import AbstractSort from "./AbstractSort"


class QuickSort extends AbstractSort {
    sort(array) {
        this.sort_section(array, 0, array.length - 1);
    }

    sort_section(array, start, end) {
        let pivot = end;
        let left = start;
        let right = end;
        while (left < right) {
            while (left != pivot && this.lt(array, left, pivot)) {
                left += 1;
            }
            if (left == pivot) break;
            this.swap(array, left, pivot);
            pivot = left;
            while (this.gt(array, right, pivot)) {
                right -= 1;
            }
            if (right == pivot) break;
            this.swap(array, right, pivot);
            pivot = right;
        }
        if (pivot - start > 1)
            this.sort_section(array, start, pivot - 1);
        if (end - pivot > 1)
            this.sort_section(array, pivot + 1, end);
    }
}
export default QuickSort;