import React, { useState, useEffect, useRef } from 'react';
import './AdBanner.css';

const Modal = ({ onClose }) => {
    const TOTAL_TIME = 20; // Общее время в секундах
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const circleRef = useRef(null);

    const handleRedirect = () => {
        window.open('https://qtickets.ru/event/156566', '_blank');
    };

    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
            // Устанавливаем начальное значение анимации
            circle.style.strokeDashoffset = '0';
            circle.style.animation = `countdown ${TOTAL_TIME}s linear forwards`;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const closeTimer = setTimeout(() => {
            onClose();
        }, TOTAL_TIME * 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

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
                            src='https://sun9-2.userapi.com/s/v1/ig2/pmYpfxu4hCofw5cjCzgG9WRfKmFTosuvTe6j1g2TLPZpKvei1K_GWmMWWwXPt-gazU7JrfluUOUzKBrJeeevy0s6.jpg?quality=95&as=32x36,48x53,72x80,108x120,160x178,240x267,360x400,480x534,540x600,640x711,720x800,1080x1201,1280x1423,1440x1601,2303x2560&from=bu&cs=510x567'
                            alt="Концертное мероприятие"
                            className="modal-image"
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