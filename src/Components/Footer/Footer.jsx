import React from "react";
import logo from "../../img/footer-logo.png";
import { Link } from 'react-router-dom';
import { FaTelegram } from "react-icons/fa";
import { FaVk } from "react-icons/fa6";
import "./style.css";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footer-flex">
                    <nav className="tipe-sport">
                        <ul className="kinds-of-sports">
                            <li>
                                <Link to="/home" className="type-of-fight">Академия</Link>
                            </li>
                            <li>
                                <Link to="/about" className="type-of-fight">Об Академии</Link>
                            </li>
                            <li>
                                <Link to="/schedule" className="type-of-fight">Расписание</Link>
                            </li>
                            <li>
                                <Link to="/attendance-journal" className="type-of-fight">Журнал посещаемости</Link>
                            </li>
                        </ul>
                        <ul className="kinds-of-sports">
                            <li>
                                <Link to="/hand-to-hand-combat" className="type-of-fight">Рукопашный бой</Link>
                            </li>
                            <li>
                                <Link to="/karate" className="type-of-fight">Каратэ</Link>
                            </li>
                            <li>
                                <Link to="/womens-self-defense" className="type-of-fight">Женская самооборона</Link>
                            </li>
                        </ul>
                        <ul className="header-components">
                            <li>
                                <Link to="/mma" className="type-of-fight">Мма</Link>
                            </li>
                            <li>
                                <Link to="/grappling" className="type-of-fight">Грэпплинг</Link>
                            </li>
                            <li>
                                <Link to="/boxing" className="type-of-fight">Бокс</Link>
                            </li>
                            <li>
                                <Link to="/kickboxing" className="type-of-fight">Кикбоксинг</Link>
                            </li>
                        </ul>
                        <ul className="header-components">
                            <li>
                                <Link to="/events" className="type-of-fight">События</Link>
                            </li>
                            <li>
                                <Link to="/press-center" className="type-of-fight">Пресс-центр</Link>
                            </li>
                            <li>
                                <Link to="/online-store" className="type-of-fight">Интернет-магазин</Link>
                            </li>
                            <li>
                                <Link to="/price" className="type-of-fight">Цены</Link>
                            </li>
                        </ul>
                    </nav>
                    <address className="contact-number">
                        <a className="contact-footer" href="tel:+79994451203" aria-label="Позвонить в Академию">
                            <p>+7 (999) 445-12-03</p>
                        </a>
                        <Link to="/waiting-list" className="list" aria-label="Записаться в клуб">
                            <p>Записаться в клуб</p>
                        </Link>
                        <div className="icons">
                            <a target="_blank" rel="noopener noreferrer" href="https://vk.com/mmakansk" aria-label="ВКонтакте">
                                <FaVk className="footer_icons" size={24} fill="rgba(193, 193, 193, 0.628)" />
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://t.me/mmakansk" aria-label="Telegram">
                                <FaTelegram className="footer_icons" size={24} fill="rgba(193, 193, 193, 0.628)" />
                            </a>
                        </div>
                    </address>
                </div>
                <div className="generalization">
                    <img className="logo-club" alt="Логотип Академии боевых единоборств ХУЛИГАН" src={logo} />
                    <span className="description">&#169;Академия боевых единоборств ХУЛИГАН, 2025</span>
                </div>
            </footer>
        )
    }
}

export default Footer;
