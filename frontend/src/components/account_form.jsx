import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import InputGroup from "react-bootstrap/InputGroup";

class AccountForm extends Component {
  state = {
    account_name: "",
    password: "",
    gen_pw: "",
    username: "",
    email: "",
    url: "",
  };
  render() {
    return (
      <Form
        noValidate
        validated={this.props.validated}
        className="w-50 mx-auto"
        onSubmit={(e) => {
          this.props.onAccountSubmit(e, this.state);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicAccountName">
          <Row className="py-1">
            <Col className="text-end text-secondary">
              <Form.Label>Account Name</Form.Label>
            </Col>
            <Col className="w-50">
              <Form.Control
                required
                type="text"
                name="account_name"
                value={this.state.account_name}
                onChange={this.handle_change}
              />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please provide a valid account name
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Row className="py-1">
            <Col xs={6} className="text-end text-secondary">
              <Form.Label>Password</Form.Label>
            </Col>
            <Col xs={6}>
              <InputGroup>
                <Form.Control
                  required
                  type={this.props.show_pw ? "text" : "password"}
                  name="password"
                  value={this.determinePasswordValue()}
                  onChange={this.handle_change}
                />
                <a href="#" onClick={() => this.props.toggleShowPassword()}>
                  <Badge
                    pill
                    bg={this.getBadgeClasses()}
                    className="showPasswordBadge"
                  >
                    {this.formatBadgeName()}
                  </Badge>
                </a>
                <a href="#" onClick={() => this.props.generatePassword()}>
                  <Badge pill bg="secondary" className="generatePasswordBadge">
                    GENERATE
                  </Badge>
                </a>
                <Form.Control.Feedback className="text-start" type="invalid">
                  Please provide a valid password
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Row className="py-1">
            <Col className="text-end text-secondary">
              <Form.Label>Username</Form.Label>
            </Col>
            <Col className="w-50">
              <Form.Control
                required
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handle_change}
              />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please provide a valid username
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Row className="py-1">
            <Col className="text-end text-secondary">
              <Form.Label>Email</Form.Label>
            </Col>
            <Col className="w-50">
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handle_change}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUrl">
          <Row className="py-1">
            <Col className="text-end text-secondary">
              <Form.Label>Website URL</Form.Label>
            </Col>
            <Col className="w-50">
              <Form.Control
                required
                type="url"
                name="url"
                value={this.state.url}
                onChange={this.handle_change}
              />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please provide a valid URL
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Row className="py-1">
          <Col className="text-end text-secondary"></Col>
          <Col className="w-50 text-start">
            <Button
              className="rounded-pill"
              variant="outline-primary"
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  formatBadgeName() {
    const { show_pw } = this.props;
    return show_pw === true ? "HIDE" : "SHOW";
  }

  getBadgeClasses() {
    const { show_pw } = this.props;
    return show_pw === true ? "secondary" : "warning";
  }

  determinePasswordValue() {
    const { generated_password } = this.props;

    if (generated_password) {
      this.state.gen_pw = generated_password;
      this.state.password = this.state.gen_pw;
      this.state.gen_pw = "";
      return this.state.password;
    }
    return this.state.password;
  }

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
}

export default AccountForm;
