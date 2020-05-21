import React from "react";
import {
  Button,
  Modal as ModalReactstrap,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
function Modal(props) {
  return (
    <ModalReactstrap isOpen={props.modal} className={props.className}>
      <ModalHeader>{props.title} </ModalHeader>
      <ModalBody>{props.msg}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.close}>
          Close
        </Button>
      </ModalFooter>
    </ModalReactstrap>
  );
}

export default Modal;
