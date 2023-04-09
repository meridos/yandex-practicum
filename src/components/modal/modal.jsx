import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keyup", onEscape, false);

    return () => {
      document.removeEventListener("keyup", onEscape, false);
    };
  }, [props.onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={props.onClose}>
        <article className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className="text text_type_main-large">{props.header}</h1>
            </div>
            {props.children}
            <span className={styles.close}>
              <CloseIcon onClick={props.onClose} />
            </span>
          </div>
        </article>
      </ModalOverlay>
    </>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};
