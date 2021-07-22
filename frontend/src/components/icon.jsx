import React, { Component } from "react";

class Icon extends Component {
  render() {
    return (
      <React.Fragment>
        <img className="icon" src={this.getImage()}></img>
      </React.Fragment>
    );
  }

  getImage() {
    const { account_data, specific_icon } = this.props;

    if (account_data) {
      return `//logo.clearbit.com/${account_data}`;
    } else {
      return specific_icon;
    }
  }
}

export default Icon;
