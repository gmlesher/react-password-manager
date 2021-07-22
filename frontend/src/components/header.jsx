import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AddItemBtn from "./add_item_btn";

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="sm" variant="light">
        <Navbar.Brand>{this.getVaultName()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="ml-auto">
            <AddItemBtn />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  getVaultName() {
    const { vault_name } = this.props;
    return vault_name;
  }
}

export default Header;
