import React from "react";
import ModalStyles from "./Modal.module.css";

const Modal = (props) => {
  const { open, handleClose, children } = props;

  return (
    <div
      id="clickAway"
      className={ModalStyles.modal}
      onClick={(e) => {
        if (e.target.id === "clickAway") {
          handleClose();
        }
      }}
      style={{ display: open ? "block" : "none" }}
    >
      <div className={ModalStyles.content}>
        <div className={ModalStyles.close} onClick={handleClose}>
          X
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
