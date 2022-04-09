import AbstractSort from "./AbstractSort"


class MergeSort extends AbstractSort {
    sort(array) {
        // Create out-of-place array for sorting
        this.array = []
        this.array[array.length - 1] = 0
        this.sort_section(array, 0, array.length - 1);
    }

    sort_section(array, start, end) {
        if (end == start) return;
        let middle = Math.floor((end - start) / 2) + start;
        this.sort_section(array, start, middle);
        this.sort_section(array, middle + 1, end);

        let leftIdx = start;
        let rightIdx = middle + 1;
        for (let i = start; i <= end; ++i) {
            if (leftIdx <= middle) {
                if (rightIdx <= end && this.lt(array, rightIdx, leftIdx)) {
                    this.array[i] = this.read(array, rightIdx);
                    rightIdx += 1;
                } else {
                    this.array[i] = this.read(array, leftIdx);
                    leftIdx += 1;
                }
            } else {
                this.array[i] = this.read(array, rightIdx);
                rightIdx += 1;
            }
        }
        for (let i = start; i <= end; ++i) {
            this.write(array, i, this.array[i]);
        }
    }
}
export default MergeSort;