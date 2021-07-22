import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Counter extends Component {
  componentDidUpdate(previousProps, previousState) {
    // console.log("previousProps", previousProps);
    // console.log("previousState", previousState);
    if (previousProps.counter.value !== this.props.counter.value) {
      // Ajax call and get new data from server
    }
  }

  render() {
    // console.log("Counter - Rendered");
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <Button
          className="btn btn-success m-2"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </Button>
        <Button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </Button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
