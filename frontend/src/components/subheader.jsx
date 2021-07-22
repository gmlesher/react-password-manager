import React, { Component } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import HorizontalLine from "./horizontal_line";

class SubHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className="pt-2 text-start">
          <Col>
            <small>Name</small>
          </Col>
          <Col>
            <small>Last Used</small>
          </Col>
        </Row>
        <HorizontalLine color="light" />
      </React.Fragment>
    );
  }
}

export default SubHeader;
