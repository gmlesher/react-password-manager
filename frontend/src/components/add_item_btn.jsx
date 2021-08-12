import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";

class AddItemBtn extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onAddItem}
        variant="outline-secondary"
        className="rounded-pill"
      >
        {this.getVaultName()}
      </Button>
    );
  }

  getVaultName() {
    const { vault_name } = this.props;
    return `Add Item in ${vault_name}`;
  }
}

export default AddItemBtn;
