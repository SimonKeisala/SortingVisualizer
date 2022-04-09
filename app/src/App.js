import React, { Component } from 'react';
import './App.css';
import Array from "./Array";
import BubbleSort from "./Algorithm/BubbleSort";
import InsertionSort from "./Algorithm/InsertionSort";
import HeapSort from "./Algorithm/HeapSort";
import SelectionSort from "./Algorithm/SelectionSort";
import QuickSort from "./Algorithm/QuickSort";
import MergeSort from "./Algorithm/MergeSort";
import { FormControl, MenuItem, Select, InputLabel, Button } from '@mui/material';

function Dropdown(label, key, values, onChange) {
  let items = values.map((item) => <MenuItem key={item.name} value={item.data}>{item.name}</MenuItem>);
  return (
    <FormControl className='item'>
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={key}
        label={label}
        onChange={onChange}
      >
        {items}
      </Select>
    </FormControl>
  )
}


function getAlgorithmDetails(algorithm) {
  let alg = algorithm.toString();
  alg = alg.replaceAll("this.", "")
  alg = alg.split("\n");
  alg.pop();
  alg.splice(0, 1);
  return alg.join("\n");
}


class App extends Component {
  constructor(props) {
    super(props);
    this.array = React.createRef();
    this.array2 = React.createRef();
    this.state = { algorithm: HeapSort, algorithm2: "off", list_size: 100, actions_per_second: 1000, algorithm_details: "" }

  }
  render() {
    let algorithms = [
      HeapSort, BubbleSort, InsertionSort, SelectionSort, QuickSort, MergeSort]
    return (
      <>
        <div className="AppHeader">
          <FormControl>
            <Button variant="contained" className='button' onClick={this.runAlgorithm.bind(this)}>Sort</Button>
          </FormControl>
          {
            Dropdown("Algorithm 1", this.state.algorithm,
              [...algorithms.map(item => ({ data: item, name: item.name }))],
              this.updateAlgorithm.bind(this))
          }
          {
            Dropdown("Algorithm 2", this.state.algorithm2,
              [{ data: "off", name: "Disabled" }, ...algorithms.map(item => ({ data: item, name: item.name }))],
              this.updateAlgorithm2.bind(this))
          }
          {
            Dropdown("ListSize", this.state.list_size, [
              { data: 100, name: "100" },
              { data: 200, name: "200" },
              { data: 300, name: "300" },
              { data: 500, name: "500" },
              { data: 1000, name: "1000" },
              { data: 5000, name: "5000" },
            ], this.updateListSize.bind(this))}
          {Dropdown("ActionsPerSecond", this.state.actions_per_second, [
            { data: 100, name: "100" },
            { data: 500, name: "500" },
            { data: 1000, name: "1000" },
            { data: 3000, name: "3000" },
            { data: 10000, name: "10000" },
          ], this.updateActionsPerSecond.bind(this))}
        </div>
        <div className="App">
          <div>
            <Array ref={this.array}></Array>
            <span style={{ display: this.state.algorithm2 == "off" ? "none" : "inline-block" }}>
              <Array ref={this.array2}></Array>
            </span>
          </div>
          <div className="algorithm"><h1>{this.state.algorithm.name}</h1>{this.state.algorithm_details}</div>
        </div>
      </>
    );
  }

  updateAlgorithm(e) {
    this.setState({ algorithm: e.target.value, algorithm_details: getAlgorithmDetails(e.target.value) })
  }

  updateAlgorithm2(e) {
    this.setState({ algorithm2: e.target.value });
    if (e.target.value !== "off") {
      this.array.current.setHeightMult(0.5)
      this.array2.current.setHeightMult(0.5)
    } else {
      this.array.current.setHeightMult(1.0)
      this.array2.current.setHeightMult(0.0)
    }
  }

  updateListSize(e) {
    this.setState({ list_size: e.target.value })
    let array = load(e.target.value);
    this.updateArray(array);
  }
  updateActionsPerSecond(e) {
    this.setState({ actions_per_second: e.target.value })
  }

  updateArray(array) {
    this.array.current.setArray([...array]);
    this.array2.current.setArray([...array]);
    clearInterval(this.handler);
    clearInterval(this.handler2);
  }

  componentDidMount() {
    let array = load(this.state.list_size);
    this.updateArray(array);
    this.setState({ algorithm_details: getAlgorithmDetails(this.state.algorithm) })
    this.array.current.setHeightMult(1.0)
    this.array2.current.setHeightMult(0.0)
  }

  runAlgorithm() {
    clearInterval(this.handler);
    clearInterval(this.handler2);
    let array = load(this.state.list_size);
    shuffle(array);
    this.updateArray(array);
    let alg = new this.state.algorithm(array, this.updateArray.bind(this))
    this.handler = this.array.current.visualize(alg.actions, this.state.actions_per_second);
    if (this.state.algorithm2 !== "off") {
      let alg2 = new this.state.algorithm2(array, this.updateArray.bind(this))
      this.handler2 = this.array2.current.visualize(alg2.actions, this.state.actions_per_second);
    }
  }
}


function load(items) {
  let array = []
  for (let i = 0; i < items; ++i) {
    array.push(i);
  }
  return array;
}
function shuffle(array) {
  for (let i = 0; i < array.length; ++i) {
    let other = randomInt(0, array.length - 1);
    [array[i], array[other]] = [array[other], array[i]];
  }
}

function randomInt(minValue, maxValue) {
  return minValue + Math.floor(Math.random() * (maxValue - minValue + 1))
}

export default App;
