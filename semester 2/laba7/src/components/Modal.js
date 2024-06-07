import React from "react";
import "./Modal.css"; 

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null; 
	}
	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close-button" onClick={onClose}>
					×
				</span>
				<div style={{ display: 'block', textAlign: 'center', color: 'white', fontSize: '21px' }}>
					Contact me!
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;