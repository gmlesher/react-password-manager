import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

class AddItemBtn extends Component {
  render() {
    return (
      <Button variant="outline-secondary" className="rounded-pill">
        Add Item
      </Button>
    );
  }
}

export default AddItemBtn;
