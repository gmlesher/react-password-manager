import React, { Component } from "react";

class Navbar extends Component {
  render() {
    // console.log("Navbar - Rendered");
    const { totalCounters } = this.props;
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">
          Navbar{" "}
          <span className="badge badge=pill badge-primary">
            {totalCounters}
          </span>
        </a>
      </nav>
    );
  }
}

export default Navbar;
