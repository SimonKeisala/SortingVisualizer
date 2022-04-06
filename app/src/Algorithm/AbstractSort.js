class AbstractSort {
    constructor(array) {
        this.actions = []
        this.comparisons = 0;
        this.swaps = 0;
        this.sort(array.slice());
        console.log(this.comparisons, this.swaps);
    }

    sort(array) {
        throw new Error("Sort method not implemented");
    }


    lt(array, a, b) {
        this.actions.push(["compare", a, b]);
        this.comparisons += 1;
        return array[a] < array[b];
    }
    gt(array, a, b) {
        this.actions.push(["compare", a, b]);
        this.comparisons += 1;
        return array[a] > array[b];
    }
    swap(array, a, b) {
        this.actions.push(["swap", a, b]);
        this.swaps += 1;
        let c = array[a];
        array[a] = array[b];
        array[b] = c;
    }
}

export default AbstractSort;