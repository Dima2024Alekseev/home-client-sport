import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollTopButton.css';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Проверяем размер экрана при загрузке и при изменении размера
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Показываем кнопку при скролле ниже 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && isMobileOrTablet) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileOrTablet]);

  // Плавный скролл наверх и скрытие кнопки
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Добавляем задержку перед скрытием кнопки
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Задержка в 500 мс
  };

  return (
    <button
      className={`scroll-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <FaArrowUp className="scroll-top-icon" />
    </button>
  );
};

export default ScrollTopButton;
