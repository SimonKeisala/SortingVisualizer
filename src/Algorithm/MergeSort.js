import AbstractSort from "./AbstractSort"


class MergeSort extends AbstractSort {
    sort(array) {
        // Create out-of-place array for sorting
        this.sort_section(array, 0, array.length - 1);
    }

    sort_section(array, start, end) {
        if (end == start) return;
        let middle = Math.floor((end - start) / 2) + start;
        this.sort_section(array, start, middle);
        this.sort_section(array, middle + 1, end);

        let leftIdx = start;
        let rightIdx = middle + 1;
        let ext_array = []
        for (let i = 0; i <= end - start; ++i) {
            if (leftIdx <= middle) {
                if (rightIdx <= end && this.lt(array, rightIdx, leftIdx)) {
                    ext_array[i] = this.read(array, rightIdx);
                    rightIdx += 1;
                } else {
                    ext_array[i] = this.read(array, leftIdx);
                    leftIdx += 1;
                }
            } else {
                ext_array[i] = this.read(array, rightIdx);
                rightIdx += 1;
            }
        }
        for (let i = 0; i <= end - start; ++i) {
            this.write(array, i + start, ext_array[i]);
        }
    }
}
export default MergeSort;