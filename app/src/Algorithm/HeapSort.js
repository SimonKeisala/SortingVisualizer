import AbstractSort from "./AbstractSort";
class HeapSort extends AbstractSort {
    sort(array) {
        this.heapify(array);
        this.do_sort(array);
    }
    heapify(array) {
        for (let i = 1; i < array.length; ++i) {
            let cur = i;
            let parent = Math.floor((cur - 1) / 2);
            while (cur > 0 && this.lt(array, parent, cur)) {
                this.swap(array, cur, parent);
                cur = parent;
                parent = Math.floor((cur - 1) / 2);
            }
        }
    }

    do_sort(array) {
        for (let end = array.length - 1; end > 0; --end) {
            this.swap(array, 0, end);
            let cur = 0;
            while (true) {
                let child = cur * 2 + 1;
                let child2 = cur * 2 + 2;
                if (child2 < end && this.lt(array, child, child2)) {
                    child = child2;
                }
                if (child < end && this.lt(array, cur, child)) {
                    this.swap(array, cur, child);
                    cur = child;
                } else {
                    break;
                }
            }
        }
    }
}

export default HeapSort;