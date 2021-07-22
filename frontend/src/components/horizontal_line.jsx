import React, { Component } from "react";

class HorizontalLine extends Component {
  render() {
    const Line = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 1,
        }}
      />
    );
    return <Line />;
  }
}

export default HorizontalLine;
