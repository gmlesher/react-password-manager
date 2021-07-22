import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Header from "./header";
import SubHeader from "./subheader";
import Account from "./account";

class Accounts extends Component {
  render() {
    const { accounts, vault_name } = this.props;
    if (!vault_name) {
      return (
        <React.Fragment>
          <Col className=" bg-light p-2 px-5" xs={9}>
            <div className="h-100 position-relative my-auto">
              <div className="position-absolute top-50 start-50 translate-middle">
                <h3 className="text-center">
                  Welcome to your Password Manager
                </h3>
                <p className="text-center">
                  Select a vault to see your account information
                </p>
              </div>
            </div>
          </Col>
        </React.Fragment>
      );
    }
    if (!accounts || accounts === undefined || accounts.length == 0) {
      return (
        <React.Fragment>
          <Col className="accounts text-center bg-light p-2 px-5" xs={9}>
            <Header vault_name={vault_name} />
            <SubHeader />
            <div className="h-75 position-relative my-auto">
              <div className="position-absolute top-50 start-50 translate-middle">
                <h3 className="text-center">No accounts in {vault_name} yet</h3>
                <p className="text-center">
                  Select "Add Item" button to get started
                </p>
              </div>
            </div>
          </Col>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Col className="accounts text-center bg-light p-2 px-5" xs={9}>
            <Header vault_name={vault_name} />
            <SubHeader />
            {accounts.map((account) => (
              <a
                key={account.id}
                className="account"
                onClick={() => {
                  this.props.onAccountSelect(account.id);
                }}
                href="#"
                id={"account" + account.id}
              >
                <Account
                  key={account.id}
                  account={account}
                  account_data={new URL(account.url).hostname.replace(
                    "www.",
                    ""
                  )}
                ></Account>
              </a>
            ))}
          </Col>
        </React.Fragment>
      );
    }
  }
}

export default Accounts;
