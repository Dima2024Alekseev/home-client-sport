import { useRef, useEffect } from "react";
import "./AdBanner.css";

const Modal = ({ onClose, imageUrl, buttonLink }) => {
    const TOTAL_TIME = 20;
    const circleRef = useRef(null);

    const handleRedirect = () => {
        window.open(buttonLink, '_blank');
    };

    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
            circle.style.strokeDashoffset = '0';
            circle.style.animation = `countdown ${TOTAL_TIME}s linear forwards`;
        }

        const closeTimer = setTimeout(() => {
            onClose();
        }, TOTAL_TIME * 1000);

        return () => {
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    if (!imageUrl) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="modal-close-button" onClick={onClose}>
                        <svg className="countdown-circle" viewBox="0 0 36 36">
                            <path
                                ref={circleRef}
                                className="countdown-circle-bg"
                                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                strokeDasharray="100"
                                strokeDashoffset="0"
                            />
                        </svg>
                        <span className="close-icon">&times;</span>
                    </button>
                </div>

                <div className="modal-scroll-container">
                    <div className="modal-body">
                        <img
                            src={`${imageUrl}`}
                            alt="изображение мероприятия"
                            className="modal-image"
                            onError={(e) => {
                                console.error('Error loading image');
                                e.target.onerror = null;
                                e.target.src = '/path/to/fallback/image.jpg';
                            }}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={handleRedirect} className="modal-button">
                        Купить билеты со скидкой
                    </button>
                    <small>Ограниченное количество билетов</small>
                </div>
            </div>
        </div>
    );
};

export default Modal;
