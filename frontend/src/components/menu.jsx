import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Category from "./category";
import MenuFooter from "./menu_footer";

class Menu extends Component {
  render() {
    const { vaults, onVaultSelect, handle_logout } = this.props;
    return (
      <Col className="menu bg-dark text-light p-3 align-items-center" xs={3}>
        <h6 className="ps-3 text-muted">VAULTS</h6>
        {vaults.map((vault) => (
          <Category
            key={vault.id}
            onVaultSelect={onVaultSelect}
            vault={vault}
          ></Category>
        ))}
        <MenuFooter handle_logout={handle_logout} />
      </Col>
    );
  }
}

export default Menu;
