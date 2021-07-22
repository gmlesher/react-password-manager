import React, { Component } from "react";
import Icon from "./icon";
import Row from "react-bootstrap/esm/Row";

class Category extends Component {
  render() {
    const { account_data } = this.props;
    const vault_id = this.props.vault.id;
    return (
      <React.Fragment>
        <div className="vaultIconCont" ref="vaultIconCont">
          <a
            className="vault vaultIcon"
            id={"vault" + vault_id}
            onClick={() => {
              this.props.onVaultSelect(this.props.vault);
            }}
          >
            <Row className="m-0">
              <h6 className="text-left">
                <Icon
                  specific_icon={"../../static/frontend/vault.png"}
                  account_data={account_data}
                />
                <span className="ps-3">{this.getName()}</span>
              </h6>
            </Row>
          </a>
        </div>
      </React.Fragment>
    );
  }

  getName() {
    const { vault_name } = this.props.vault;
    return vault_name;
  }
}

export default Category;
