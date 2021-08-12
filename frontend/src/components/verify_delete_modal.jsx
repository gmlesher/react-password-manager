import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class VerifyDeleteModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {this.props.account_name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5 className="text-danger">This action cannot be undone!</h5>
          <p>
            All of the data associated with{" "}
            <strong>{this.props.account_name}</strong> will be obliterated.
          </p>
          <p>Think twice if you can't afford to lose this data.</p>
          <h2>&#129300;</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="rounded-pill"
            variant="outline-secondary"
            onClick={this.props.onHide}
          >
            Close
          </Button>
          <Button
            className="rounded-pill"
            variant="outline-danger"
            onClick={this.props.onVerifyDelete}
          >
            Delete Forever
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VerifyDeleteModal;
