import React, { Component } from "react";
import "./Counter.css";

class Counter extends Component {
  constructor() {
    super(); //error 1
    this.state = {
      counter: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment(by) {
    //Update state
    console.log("incerement");
    this.setState({
      counter: this.state.counter + by,
    });
  }
  decrement(by) {
    this.setState({
      counter: this.state.counter - by,
    });
  }

  reset() {
    this.setState({
      counter: 0,
    });
  }

  render() {
    return (
      <div className="counter">
        <CounterButton
          by={1}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        ></CounterButton>
        <CounterButton
          by={5}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        ></CounterButton>
        <CounterButton
          by={10}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        ></CounterButton>

        <button className="resetButton" onClick={this.reset}>
          Reset
        </button>

        <p className="countButton">{this.state.counter}</p>
      </div>
    );
  }
}

class CounterButton extends Component {
  //Define the initial state in a constructor
  //state => counter

  constructor() {
    super(); //error 1
    //this.state = {
    //  counter: 0,
    //};

    //this.increment = this.increment.bind(this);
    //this.decrement = this.decrement.bind(this);
  }

  /*increment() {
    //Update state
    console.log("incerement");
    this.setState({
      counter: this.state.counter + this.props.by,
    });
    this.props.incrementMethod(this.props.by);
  */
  /*
  decrement() {
    this.setState({
      counter: this.state.counter - this.props.by,
    });
    this.props.decrementMethod(this.props.by);
  }
  */

  render() {
    return (
      <div className="counterButton">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>
          + {this.props.by}
        </button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>
          - {this.props.by}
        </button>
      </div>
    );
  }
}

CounterButton.defaultProps = {
  by: 1,
};

export default Counter;
