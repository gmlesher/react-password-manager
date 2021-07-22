import React, { Component } from "react";

class AccountName extends Component {
  render() {
    return (
      <React.Fragment>
        <h6>{this.getName()}</h6>
        <small className="text-muted">{this.getEmail()}</small>
      </React.Fragment>
    );
  }

  getName() {
    const { account_name } = this.props.account;
    return account_name;
  }

  getEmail() {
    const { email } = this.props.account;
    return email;
  }
}

export default AccountName;
