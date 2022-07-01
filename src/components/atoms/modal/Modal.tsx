import { Button } from "components/atoms/button/Button";
import * as React from "react";
import { ButtonIcon } from "../buttonIcon/ButtonIcon";
// import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.props";

const Modal: React.FC<ModalProps> = ({ setIsModalOpen, children }) => {
  return (
    <div>
      <div className={styles.modalOverlay} />
      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <ButtonIcon
            icon="close"
            appearance="white"
            onClick={() => setIsModalOpen(false)}
          ></ButtonIcon>
        </div>

        <div className={styles.modalBoxContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;