import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="mx-auto text-center p-3">Login Form</h4>
        <Form
          className="w-25 mx-auto"
          onSubmit={(e) => {
            this.props.handle_login(e, this.state);
            // e.preventDefault();
            // console.log(this.state);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
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

export default LoginForm;
