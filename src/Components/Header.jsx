import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from "../img/header-icon.png";
import Navbar from "./Navbar/Navbar";
import MobileMenu from "./MobileMenu";
import { TbUserSquareRounded, TbLogout } from "react-icons/tb";
import { FaTelegram } from "react-icons/fa";
import { FaVk } from "react-icons/fa6";
import useTitle from './UseTitle';

const Header = ({ title, icon, innerTitle, linkText, showVideoHomePages, showGradient, showBlock, videoBackgroundDirections, videoSrc, onLogout }) => {
  useTitle(title, icon, innerTitle, linkText);

  const [nav, setNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const location = useLocation();

  useEffect(() => {
    if (showGradient) {
      const inner = document.getElementById('inner');
      let angle = 50;
      let direction = 1; // 1 для увеличения, -1 для уменьшения

      function updateGradient() {
        angle += direction;

        // Изменяем направление, когда угол достигает 150 или 50 градусов
        if (angle >= 250) {
          direction = -0.5;
        } else if (angle <= 50) {
          direction = 0.5;
        }

        inner.style.background = `linear-gradient(${angle}deg, rgb(0, 0, 0) 50%, rgba(125, 186, 232, 0) 100%), url('https://img.freepik.com/premium-vector/black-red-geometric-abstract-background_1027691-512.jpg?w=360') right top, rgb(18, 18, 18)`;
        requestAnimationFrame(updateGradient);
      }

      updateGradient();

      // Очистка анимации при размонтировании компонента
      return () => {
        cancelAnimationFrame(updateGradient);
      };
    }
  }, [showGradient]);

  useEffect(() => {
    if (nav) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    // Возвращение вертикальной прокрутки при размонтировании компонента
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [nav]);

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
    <div id={showGradient ? "inner" : ""} style={videoBackgroundDirections ? {
      position: 'relative',
      zIndex: 2
    } : {}}>
      {videoBackgroundDirections && (
        <div>
          <video className="background-video" autoPlay loop muted style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: -2
          }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="overlay"></div>
        </div>
      )}
      <header id={showVideoHomePages ? "video-container" : ""}>
        {showVideoHomePages && (
          <video className="background-video" autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {showVideoHomePages && <div className="overlay"></div>}
        <div>
          <div className={nav ? ["header-flex", "active"].join(" ") : ["header-flex"]}>
            
            <Link to="/">
              <div>
                <img className="logo-header" alt="" src={logo} />
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
                <a className="header-icons_1" target="_blank" rel="noopener noreferrer" href="https://vk.com/mmakansk">
                  <FaVk className="social-network" size={24} />
                </a>
                <a className="header-icons_1" target="_blank" rel="noopener noreferrer" href="https://t.me/mmakansk">
                  <FaTelegram className="social-network" size={24} />
                </a>
              </div>
            </div>
            {isAuthenticated && location.pathname === '/admin-dashboard' && (
              <div className="personal-area" onClick={handleLogout}>
                <TbLogout className="profile-icon" size={45} color="white" />
              </div>
            )}
            {isAuthenticated && location.pathname !== '/admin-dashboard' && (
              <Link to="/admin-dashboard">
                <div className="personal-area">
                  <TbUserSquareRounded className="profile-icon" size={45} color="white" />
                </div>
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/authorization-account">
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
        <div className="title">
          <h1>Title Header</h1>
        </div>
        <div className="links">
          <div style={{ borderRight: '1px solid white', paddingRight: '10px' }}>
            <Link to="/">Главная</Link>
          </div>
          <div>
            <Link to="#" style={{ color: 'white', paddingLeft: '10px' }}></Link>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Header;
