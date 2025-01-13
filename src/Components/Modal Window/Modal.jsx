import React from "react";
import "../Modal Window/modal.css";

const Modal = ({ active, setActive, imageSrc }) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)} role="dialog" aria-modal="true">
            <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()} role="document">
                <span className="close-btn" onClick={() => setActive(false)}>&times;</span>
                {imageSrc && <img src={imageSrc} alt="Selected" className="modal_image" />}
            </div>
        </div>
    );
};

export default Modal;
