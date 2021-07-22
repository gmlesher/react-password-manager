import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Counter from "./counter";

class Counters extends Component {
  render() {
    // console.log("Counters - Rendered");
    const { onReset, counters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <Button onClick={onReset} className="btn btn-primary btn sm m-2">
          Reset
        </Button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            counter={counter}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
