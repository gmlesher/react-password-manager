import React, { Component } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import AccountForm from "./account_form";
import HorizontalLine from "./horizontal_line";
import Icon from "./icon";

class AddAccount extends Component {
  render() {
    const {
      onAccountSubmit,
      validated,
      show_pw,
      toggleShowPassword,
      generatePassword,
      generated_password,
    } = this.props;
    return (
      <div>
        <Offcanvas
          show={this.props.onAddAccountShow}
          onHide={this.props.onAddAccountOnHide}
          placement="end"
          backdrop={true}
          // backdropClassName="modal-backdrop fade show"
          className="bg-light text-center px-5"
        >
          <Offcanvas.Header className="py-5" closeButton={true}>
            <Offcanvas.Title>
              <div className="detailIcon">
                {/* <Icon account_data={this.getIconData()} /> */}
                <div>Add Item</div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <HorizontalLine />
          <Offcanvas.Body>
            <AccountForm
              onAccountSubmit={onAccountSubmit}
              validated={validated}
              show_pw={show_pw}
              toggleShowPassword={toggleShowPassword}
              generatePassword={generatePassword}
              generated_password={generated_password}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }

  //   getIconData() {
  //     const { account_data } = this.props;
  //     var data = Object.entries(account_data)
  //       .slice(5, 6)
  //       .map(([key, val]) => {
  //         // console.log(`${key}: ${val}`);
  //         return new URL(val).hostname.replace("www.", "");
  //       });
  //     return data;
  //   }
}

export default AddAccount;
