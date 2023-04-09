import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClick();
    }
  }

  const onEscape = useCallback(
    (event) => {
      if (event.key === "Escape") {
        props.onClick();
      }
    },
    [props.onClick]
  );

  useEffect(() => {
    document.addEventListener("keyup", onEscape, false);

    return () => {
      document.removeEventListener("keyup", onEscape, false);
    };
  }, [onEscape]);

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {props.children}
    </div>
  );
}
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function Modal(props) {
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
