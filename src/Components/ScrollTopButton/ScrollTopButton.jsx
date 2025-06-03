import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollTopButton.css';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Проверяем размер экрана
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

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300 && isMobileOrTablet);
    };

    // Добавляем троттлинг для оптимизации
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [isMobileOrTablet]);

  // Плавный скролл наверх
  const scrollToTop = () => {
    setIsVisible(false);

    // Альтернативный вариант для лучшей поддержки
    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / 1000, 1); // 500ms duration
      const easeInOut = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition * (1 - easeInOut));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
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

// Функция троттлинга
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default ScrollTopButton;