import React, { Component } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import HorizontalLine from "./horizontal_line";
import Icon from "./icon";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

class Details extends Component {
  render() {
    return (
      <div>
        <Offcanvas
          show={this.props.show}
          onHide={this.props.onHide}
          placement="end"
          backdrop={true}
          // backdropClassName="modal-backdrop fade show"
          className="bg-light text-center px-5"
        >
          <Offcanvas.Header className="py-5" closeButton={true}>
            <Offcanvas.Title>
              <div className="detailIcon">
                <Icon account_data={this.getIconData()} />
                <div>{this.getAccountName()}</div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <HorizontalLine />
          <Offcanvas.Body>{this.getAllOtherData()}</Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }

  getIconData() {
    const { account_data } = this.props;
    var data = Object.entries(account_data)
      .slice(5, 6)
      .map(([key, val]) => {
        // console.log(`${key}: ${val}`);
        return new URL(val).hostname.replace("www.", "");
      });
    return data;
  }

  getAccountName() {
    const { account_data } = this.props;
    const account_name = account_data.account_name;
    return account_name;
  }

  getAllOtherData() {
    const { account_data } = this.props;
    var data = Object.entries(account_data)
      .slice(2, 6)
      .map(([key, val]) => {
        // console.log(`${key}: ${val}`);
        if (key === "url") {
          return (
            <Row key={key} className="py-3">
              <Col className="text-end text-secondary">
                {"Website " + key.toUpperCase()}
              </Col>
              <Col className="text-start">
                {" "}
                <span>
                  <a className="detailUrl" href={`${val}`} target="_blank">
                    {" "}
                    {val}
                  </a>
                </span>
              </Col>
            </Row>
          );
        } else {
          return (
            <Row key={key} className="py-3">
              <Col className="text-end text-secondary">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Col>
              <Col className="text-start">{val}</Col>
            </Row>
          );
        }
      });

    return data;
  }
}

export default Details;