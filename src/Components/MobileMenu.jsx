import React from "react";
import { Link, useLocation } from 'react-router-dom'; // Импорт useLocation
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { TbUserSquareRounded, TbLogout } from "react-icons/tb";
import logo from "../img/header-icon.png";

const MobileMenu = ({ nav, setNav }) => {
    const location = useLocation(); // Получение текущего пути
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Проверка аутентификации

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        window.location.reload(); // Перезагрузка страницы после выхода
    };

    return (
        <div className="position-mobile-logo-and-menu">
            <Link to="/">
                <div className="logo-mobile">
                    <img className="logo-header" alt="" src={logo}/>
                </div>
            </Link>
            <div className="profile-menu-number">
                <div className="menu-profile-flex">
                    <div onClick={() => setNav(!nav)} className="mobile_btn">
                        {nav ? <AiOutlineClose color="white" size={40} /> : <AiOutlineMenu color="white" size={40} />}
                    </div>
                    {isAuthenticated && location.pathname === '/admin-dashboard' && (
                        <div className="mobile-profile" onClick={handleLogout}>
                            <TbLogout color="white" size={40} />
                        </div>
                    )}
                    {isAuthenticated && location.pathname !== '/admin-dashboard' && (
                        <Link to="/admin-dashboard">
                            <div className="mobile-profile">
                                <TbUserSquareRounded color="white" size={40} />
                            </div>
                        </Link>
                    )}
                    {!isAuthenticated && (
                        <Link to="/authorization-account">
                            <div className="mobile-profile">
                                <TbUserSquareRounded color="white" size={40} />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
