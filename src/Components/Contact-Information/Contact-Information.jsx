import React, { useState, useEffect } from "react";
import "./contact-information-style.css";
import {
  MdContactSupport,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdSchedule
} from "react-icons/md";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleContactInfo = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <section className="contact-information">
      <div>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A3d897469566a332b4d1908c68eb7363ab50a0295acf74168d96606ecb5284dc9&amp;source=constructor"
          width="100%"
          height="500px"
          title="Yandex Map"
          aria-label="Карта Яндекс"
        ></iframe>
      </div>
      {isMobile && (
        <button
          className={`contact-circle ${isOpen ? "open" : ""}`}
          onClick={toggleContactInfo}
          aria-pressed={isOpen}
          aria-label="Открыть контактную информацию"
        >
          <MdContactSupport className={`contact-icon ${!isOpen ? "animate" : ""}`} aria-label="Контактная информация" />
        </button>
      )}
      <div className={`contact ${isOpen || !isMobile ? "fade-in" : "fade-out"}`}>
        <section className="info-contact">
          <h2 className="contact-title">
            <MdContactSupport className="title-icon" /> Контакты
          </h2>
          <p className="contact-number-club">
            <MdPhone className="info-icon" /> +7 (999) 445-12-03
          </p>
          <address className="address">
            <MdLocationOn className="info-icon" /> Адрес: г. Канск, улица 40 лет Октября, 62 ст 4, 2 этаж
          </address>
          <h2 className="operating-mode">
            <MdSchedule className="title-icon" /> Режим работы Академии
          </h2>
          <div className="schedule-container">
            <p className="mon-schedule">
              Понедельник - Суббота: <span>7:00 – 24:00</span>
            </p>
            <p className="sun-schedule">
              Воскресенье: <span>9:00 – 22:00</span>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;