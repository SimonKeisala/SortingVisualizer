class AbstractSort {
    constructor(array) {
        this.actions = []
        this.comparisons = 0;
        this.swaps = 0;
        this.sort(array.slice());
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

    read(array, i) {
        this.actions.push(["read", i, null])
        return array[i];
    }

    write(array, i, value) {
        this.actions.push(["write", i, value])
        array[i] = value;
    }
}

export default AbstractSort;