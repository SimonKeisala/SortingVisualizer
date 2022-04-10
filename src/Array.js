import React, { Component } from "react";
import "./Array.css";

class Array extends Component {
    constructor(props) {
        super(props);
        this.height_mult = 1;
        this.state = {
            array: [],
        }
        this.array_container = React.createRef();
        this.read_number = React.createRef();
        this.write_number = React.createRef();
        this.reads = 0;
        this.writes = 0;
        this.bars_to_clear = [];
    }
    setArray(array) {
        this.setState({ array: array });
    }
    setHeightMult(mult) {
        this.height_mult = mult;
        this.updateContainerDimensions();
    }
    visualize(actions, actions_per_second) {
        this.actions = actions;
        this.start_time = (new Date()).getTime();
        this.actions_per_second = actions_per_second;
        this.action_index = 0;
        this.writes = 0;
        this.reads = 0;
        this.handler = setInterval(this.visualization_subroutine.bind(this), 0)
        return this.handler;
    }

    visualization_subroutine() {
        for (let bar of this.bars_to_clear) {
            bar.className = "bar-item";
        }
        this.bars_to_clear = [];

        let curr_time = (new Date()).getTime();
        let end_action = this.actions_per_second * (curr_time - this.start_time) / 1000;
        end_action = Math.floor(Math.min(this.actions.length, end_action));
        let bars = this.array_container.current.children;
        for (let i = this.action_index; i < end_action; ++i) {
            let [type, a, b] = this.actions[i]
            if (type == "write") {
                this.write_value(bars, a, b);
            } else if (type == "swap") {
                let c = this.state.array[a];
                this.write_value(bars, a, this.state.array[b]);
                this.write_value(bars, b, c);
            } else if (type == "read") {
                this.read_value(bars, a);
            } else if (type == "compare") {
                this.read_value(bars, a);
                this.read_value(bars, b);
            }
        }
        this.write_number.current.innerHTML = this.writes;
        this.read_number.current.innerHTML = this.reads;
        this.action_index = end_action;
        if (end_action == this.actions.length) {
            clearInterval(this.handler);
            for (let bar of this.bars_to_clear) {
                bar.className = "bar-item";
            }
            this.bars_to_clear = [];
        }
    }

    write_value(bars, index, value) {
        bars[index].style.height = `${100 * value / bars.length}%`
        bars[index].className += " written";
        this.bars_to_clear.push(bars[index])
        this.state.array[index] = value;
        this.writes += 1;
    }
    read_value(bars, index) {
        bars[index].className += " read";
        this.bars_to_clear.push(bars[index])
        this.reads += 1;
    }

    render() {
        let items = this.state.array.map((item, index) =>
            <div key={index} style={{
                height: `${100 * item / this.state.array.length}%`
            }} className={"bar-item"}></div >)
        return (
            <div className="Array">
                <div style={{ textAlign: "left" }}>
                    <span style={{ paddingLeft: 10, paddingRight: 10 }}>Read: <span ref={this.read_number}>0</span></span>
                    <span>Write: <span ref={this.write_number}>0</span></span>
                </div>
                <div ref={this.array_container} className="container">
                    {items}
                </div>
            </div >
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
        this.window_width = window.innerWidth
        this.window_height = window.innerHeight
        this.updateContainerDimensions();
    }

    updateContainerDimensions() {
        this.array_container.current.style.width = `${this.window_width - 500}px`;
        this.array_container.current.style.height = `${(this.window_height - 100) * this.height_mult - 49}px`;
    }
}

export default Array;