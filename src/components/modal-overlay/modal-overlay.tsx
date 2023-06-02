import { FC, PropsWithChildren, SyntheticEvent } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay: FC<PropsWithChildren<IModalOverlayProps>> = (
  props
) => {
  function onOverlayClick(e: SyntheticEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      props.onClick();
    }
  }

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {props.children}
    </div>
  );
};
