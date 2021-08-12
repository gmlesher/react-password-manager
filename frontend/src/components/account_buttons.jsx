import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class AccountButtons extends Component {
  render() {
    return (
      <span>
        <Button
          name="accountDeleteButton"
          variant="outline-danger"
          size="sm"
          className="accountButton rounded-pill"
          onClick={this.props.onDelete}
        >
          Delete
        </Button>
        <Button
          name="accountEditButton"
          variant="outline-secondary"
          size="sm"
          className="accountButton rounded-pill ms-2"
        >
          Edit
        </Button>
      </span>
    );
  }
}

export default AccountButtons;
