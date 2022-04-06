import React, { Component } from "react";
import "./Array.css";

class Array extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [], swapped: new Set(), compared: new Set(), heightMult: 1,
            comparisons: 0, swaps: 0
        }
        this.comparisons = 0;
        this.swaps = 0;
    }
    setArray(array) {
        this.setState({ array: array });
    }
    setHeightMult(mult) {
        this.setState({ heightMult: mult })
    }
    visualize(actions, actions_per_second) {
        this.actions = actions;
        this.start_time = (new Date()).getTime();
        this.actions_per_second = actions_per_second;
        this.action_index = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.setState({ comparisons: this.comparisons, swaps: this.swaps })
        this.handler = setInterval(this.visualization_subroutine.bind(this), 0)
        return this.handler;
    }

    visualization_subroutine() {
        let curr_time = (new Date()).getTime();
        let end_action = this.actions_per_second * (curr_time - this.start_time) / 1000;
        end_action = Math.floor(Math.min(this.actions.length, end_action));
        let array = this.state.array;
        let swaps = new Set();
        let compared = new Set();
        if (end_action == this.action_index) return;
        for (let i = this.action_index; i < end_action; ++i) {
            let [type, a, b] = this.actions[i]
            if (type == "swap") {
                let c = array[a]
                array[a] = array[b]
                array[b] = c
                swaps.add(a);
                swaps.add(b);
                this.swaps += 2;
            } else {
                compared.add(a);
                compared.add(b);
                this.comparisons += 2;
            }
        }
        this.setState({
            array: array, swapped: swaps, compared: compared,
            comparisons: this.comparisons, swaps: this.swaps
        })
        this.action_index = end_action;
        if (end_action == this.actions.length) {
            clearInterval(this.handler);
            this.setState({ array: array, swapped: new Set(), compared: new Set() })
        }
    }

    item_class(index) {
        return this.state.swapped.has(index) ? "swapped" :
            this.state.compared.has(index) ? "compared" : ""
    }
    render() {
        let itemWidth = (this.state.width - 500) / this.state.array.length;
        let itemHeight = (this.state.height - 180) / this.state.array.length * this.state.heightMult;
        let items = this.state.array.map((item, index) =>
            <div key={index} style={{ width: itemWidth, height: item * itemHeight }} className={"array-item " + this.item_class(index)}></div >)
        return (
            <>
                <div style={{ textAlign: "left" }}>
                    <span style={{ paddingLeft: 10, paddingRight: 10 }}>Read: {this.state.comparisons}</span>
                    <span>Write: {this.state.swaps}</span>
                </div>
                <div className="array-container">
                    {items}
                </div>
            </>
        )
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }
}

export default Array;