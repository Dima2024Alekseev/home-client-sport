import React from "react";
import "../Modal Window/modal.css";

const Modal = ({ active, setActive, imageSrc }) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={() => setActive(false)}>&times;</span>
                {imageSrc && <img src={imageSrc} alt="Selected" className="modal_image" />}
            </div>
        </div>
    );
};

export default Modal;
