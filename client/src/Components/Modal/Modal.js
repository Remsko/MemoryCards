import styles from './Modal.module.css';

const Modal = ({ show, onHide, children }) => {
	if (show) {
		return (
			<div className={styles.ModalBackground}>
				<div className={styles.ModalContainer}>
					<button onClick={onHide}>X</button>
					{children}
				</div>
			</div>
		);
	}
	return <></>;
};

export default Modal;
