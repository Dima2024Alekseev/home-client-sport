import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from "../img/header-icon.png";
import Navbar from "./Navbar/Navbar";
import MobileMenu from "./MobileMenu";
import { TbUserSquareRounded, TbLogout } from "react-icons/tb";
import { FaTelegram, FaYoutube } from "react-icons/fa";
import { FaVk } from "react-icons/fa6";
import useTitle from './UseTitle';
import blackRedImage from "../img/black-red.png";

const Header = ({ icon, innerTitle, linkText, showVideoHomePages, showGradient, showBlock, videoBackgroundDirections, videoSrc, onLogout, homeRoute }) => {
  useTitle(icon, innerTitle, linkText);

  const [nav, setNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const location = useLocation();
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  // Добавляем видео элементы в ref
  const addVideoToRef = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (showGradient) {
      const inner = document.getElementById('inner');
      if (inner) {
        let angle = 50;
        let direction = 1;

        function updateGradient() {
          angle += direction;

          if (angle >= 250) {
            direction = -0.5;
          } else if (angle <= 50) {
            direction = 0.5;
          }

          inner.style.background = `linear-gradient(${angle}deg, rgb(0, 0, 0) 50%, rgba(125, 186, 232, 0) 100%), url(${blackRedImage}) right top, rgb(18, 18, 18)`;
          requestAnimationFrame(updateGradient);
        }

        updateGradient();

        return () => {
          cancelAnimationFrame(updateGradient);
        };
      }
    }
  }, [showGradient]);

  useEffect(() => {
    if (nav) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [nav]);

  // Убираем элементы управления у всех видео
  useEffect(() => {
    const handleVideoControls = () => {
      videoRefs.current.forEach(video => {
        if (video) {
          // Удаляем стандартные элементы управления
          video.removeAttribute('controls');

          // Добавляем атрибуты для iOS
          video.setAttribute('playsInline', '');
          video.setAttribute('webkit-playsinline', '');

          // Пытаемся запустить автовоспроизведение
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Autoplay prevented:', error);
            });
          }
        }
      });
    };

    handleVideoControls();

    // Обработчик для случаев, когда видео может быть добавлено динамически
    const observer = new MutationObserver(handleVideoControls);
    document.querySelectorAll('video').forEach(video => {
      observer.observe(video, { attributes: true });
    });

    return () => {
      observer.disconnect();
    };
  }, [showVideoHomePages, videoBackgroundDirections]);

  const handleLogout = () => {
    confirmAlert({
      title: 'Выход из учетной записи',
      message: 'Вы точно хотите выйти из учетной записи?',
      buttons: [
        {
          label: 'Да',
          onClick: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
            if (onLogout) {
              onLogout();
            }
            navigate('/authorization-account');
          }
        },
        {
          label: 'Нет',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <section id={showGradient ? "inner" : ""} style={videoBackgroundDirections ? {
      position: 'relative',
      zIndex: 2
    } : {}}>
      {videoBackgroundDirections && (
        <div>
          <video
            ref={addVideoToRef}
            className="background-video"
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
              zIndex: -2
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="overlay"></div>
        </div>
      )}
      <header id={showVideoHomePages ? "video-container" : ""}>
        {showVideoHomePages && (
          <video
            ref={addVideoToRef}
            className="background-video"
            autoPlay
            loop
            muted
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {showVideoHomePages && <div className="overlay"></div>}
        <div>
          <div className={nav ? ["header-flex", "active"].join(" ") : ["header-flex"]}>

            <Link to="/" aria-label="Home">
              <div>
                <img className="logo-header" alt="Logo" src={logo} />
              </div>
            </Link>
            <Navbar />
            <div className="header-contact">
              <a href="tel:+79994451203" id="list-header">
                <div>
                  <h3>+7 (999) 445-12-03</h3>
                </div>
              </a>
              <Link to="/waiting-list" id="list-header">
                <div>
                  <p>Записаться в клуб</p>
                </div>
              </Link>
              <div className="header-icons">
                <a className="header-icons_1" target="_blank" rel="noopener noreferrer" href="https://vk.com/mmakansk" aria-label="VK">
                  <FaVk className="social-network" size={24} />
                </a>
                <a className="header-icons_1" target="_blank" rel="noopener noreferrer" href="https://t.me/mmakansk" aria-label="Telegram">
                  <FaTelegram className="social-network" size={24} />
                </a>
                <a className="header-icons_1" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@hooliganfc24" aria-label="Youtube">
                  <FaYoutube className="social-network" size={27} />
                </a>
              </div>
            </div>
            {isAuthenticated && location.pathname === '/admin-dashboard' && (
              <button className="personal-area" onClick={handleLogout} aria-label="Logout">
                <TbLogout className="profile-icon" size={45} />
              </button>
            )}
            {isAuthenticated && location.pathname !== '/admin-dashboard' && (
              <Link to="/admin-dashboard" aria-label="Admin Dashboard">
                <div className="personal-area">
                  <TbUserSquareRounded className="profile-icon" size={45} />
                </div>
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/authorization-account" aria-label="Authorization">
                <div className="personal-area">
                  <TbUserSquareRounded className="profile-icon" size={45} color="white" />
                </div>
              </Link>
            )}
          </div>
          <MobileMenu nav={nav} setNav={setNav} />
        </div>
      </header>
      {showBlock && <div className="content">
        <div className="innerTitle">
          <h1>Title Header</h1>
        </div>
        <nav className="links">
          <div style={{ borderRight: '1px solid white', paddingRight: '10px' }}>
            <Link to={homeRoute} aria-label="Home">Главная</Link>
          </div>
          <div>
            <Link to="#" style={{ color: 'white', paddingLeft: '10px' }} aria-label="Link"></Link>
          </div>
        </nav>
      </div>}
    </section>
  );
};

export default Header;