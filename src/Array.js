import React, { Component } from "react";
import "./Array.css";

class Array extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            heightMult: 1,
            current_writes: new Set(),
            current_reads: new Set(),
            total_reads: 0,
            total_writes: 0,
        }
        this.reads = 0;
        this.writes = 0;
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
        this.writes = 0;
        this.reads = 0;
        this.setState({
            total_reads: this.reads,
            total_writes: this.writes
        })
        this.handler = setInterval(this.visualization_subroutine.bind(this), 0)
        return this.handler;
    }

    visualization_subroutine() {
        let curr_time = (new Date()).getTime();
        let end_action = this.actions_per_second * (curr_time - this.start_time) / 1000;
        end_action = Math.floor(Math.min(this.actions.length, end_action));
        let array = this.state.array;
        let writes = new Set();
        let reads = new Set();
        for (let i = this.action_index; i < end_action; ++i) {
            let [type, a, b] = this.actions[i]
            if (type == "write") {
                array[a] = b
                writes.add(a);
                this.writes += 1;
            } else if (type == "swap") {
                let c = array[a]
                array[a] = array[b]
                array[b] = c
                writes.add(a);
                writes.add(b);
                this.writes += 2;
            } else if (type == "read") {
                reads.add(a);
                this.reads += 1;
            } else if (type == "compare") {
                reads.add(a);
                reads.add(b);
                this.reads += 2;
            }
        }
        this.setState({
            array: array,
            current_reads: reads,
            current_writes: writes,
            total_reads: this.reads,
            total_writes: this.writes
        })
        this.action_index = end_action;
        if (end_action == this.actions.length) {
            clearInterval(this.handler);
            this.setState({
                current_reads: new Set(),
                current_writes: new Set(),
            })
        }
    }

    item_class(index) {
        return this.state.current_reads.has(index) ? "read" :
            this.state.current_writes.has(index) ? "written" : ""
    }

    render() {
        let itemWidth = (this.state.width - 500) / this.state.array.length;
        let contentHeight = (this.state.height - 100) * this.state.heightMult - 49;
        let itemHeight = contentHeight / this.state.array.length;
        let items = this.state.array.map((item, index) =>
            <div key={index} style={{ width: itemWidth, height: item * itemHeight }} className={"item " + this.item_class(index)}></div >)
        return (
            <div className="Array">
                <div style={{ textAlign: "left" }}>
                    <span style={{ paddingLeft: 10, paddingRight: 10 }}>Read: {this.state.total_reads}</span>
                    <span>Write: {this.state.total_writes}</span>
                </div>
                <div className="container" style={{ height: contentHeight }}>
                    {items}
                </div>
            </div>
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