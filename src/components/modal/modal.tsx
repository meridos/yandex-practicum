import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

interface IModalProps {
  onClose: () => void;
  header?: string;
}

export const Modal: FC<PropsWithChildren<IModalProps>> = (props) => {
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
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
              <CloseIcon type="primary" onClick={props.onClose} />
            </span>
          </div>
        </article>
      </ModalOverlay>
    </>,
    modalRoot!
  );
};
