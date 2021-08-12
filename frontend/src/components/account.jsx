import React, { Component } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AccountName from "./account_name";
import AccountButtons from "./account_buttons";
import Icon from "./icon";
import HorizontalLine from "./horizontal_line";

class Account extends Component {
  render() {
    const { account, account_data, onDelete } = this.props;
    return (
      <React.Fragment>
        <Row className="text-start align-items-center">
          <Col xs={2} className="text-center accountIcon">
            <Icon account_data={account_data} />
          </Col>
          <Col xs={4}>
            <AccountName account={account} />
          </Col>
          <Col xs={3}>
            <small className="text-muted">12 minutes ago</small>
          </Col>
          <Col xs={3}>
            <AccountButtons onDelete={onDelete} />
          </Col>
        </Row>
        <HorizontalLine color="light" />
      </React.Fragment>
    );
  }
}

export default Account;
