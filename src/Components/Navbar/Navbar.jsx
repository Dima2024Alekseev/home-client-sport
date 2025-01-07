import React from "react";
import "./NavigationStyles.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul className="navigation">
                <li className="first-li"><Link to="/home">Академия</Link>
                    <ul>
                        <li><Link to="/about">Об Академии</Link></li>
                        <li><Link to="/contact">Контакты</Link></li>
                    </ul>
                </li>
                <li><Link to="#">Направления</Link>
                    <ul>
                        <li><Link to="/mma">ММА</Link></li>
                        <li><Link to="/grappling">Грэпплинг</Link></li>
                        <li><Link to="/boxing">Бокс</Link></li>
                        <li><Link to="/kickboxing">Кикбоксинг</Link></li>
                        <li><Link to="/hand-to-hand-combat">Рукопашный бой</Link></li>
                        <li><Link to="/karate">Каратэ</Link></li>
                        <li><Link to="/womens-self-defense">Женская самооборона</Link></li>
                    </ul>
                </li>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/attendance-journal">Журнал посещаемости</Link></li>
                <li><Link to="/events">События</Link></li>
                <li><Link to="/press-center">Пресс-центр</Link></li>
                <li><Link to="/online-store">Интернет-магазин</Link></li>
                <li className="last-li"><Link to="/price">Цены</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
