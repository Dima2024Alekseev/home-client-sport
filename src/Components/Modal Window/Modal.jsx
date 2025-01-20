import React from "react";
import "../Modal Window/modal.css";

const Modal = ({ active, setActive, imageSrc }) => {
    return (
        <dialog className={active ? "modal active" : "modal"} onClick={() => setActive(false)} aria-modal="true">
            <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setActive(false)} aria-label="Закрыть">
                    &times;
                </button>
                {imageSrc && <img src={imageSrc} alt="Selected" className="modal_image" />}
            </div>
        </dialog>
    );
};

export default Modal;
