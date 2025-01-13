import React from "react";
import "./NavigationStyles.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav aria-label="Main navigation">
            <ul className="navigation" role="menubar">
                <li className="first-li" role="none">
                    <Link to="/" role="menuitem">Академия</Link>
                    <ul role="menu">
                        <li role="none"><Link to="/about" role="menuitem">Об Академии</Link></li>
                        <li role="none"><Link to="/contact" role="menuitem">Контакты</Link></li>
                    </ul>
                </li>
                <li role="none">
                    <Link to="#" role="menuitem">Направления</Link>
                    <ul role="menu">
                        <li role="none"><Link to="/mma" role="menuitem">ММА</Link></li>
                        <li role="none"><Link to="/grappling" role="menuitem">Грэпплинг</Link></li>
                        <li role="none"><Link to="/boxing" role="menuitem">Бокс</Link></li>
                        <li role="none"><Link to="/kickboxing" role="menuitem">Кикбоксинг</Link></li>
                        <li role="none"><Link to="/hand-to-hand-combat" role="menuitem">Рукопашный бой</Link></li>
                        <li role="none"><Link to="/karate" role="menuitem">Каратэ</Link></li>
                        <li role="none"><Link to="/womens-self-defense" role="menuitem">Женская самооборона</Link></li>
                    </ul>
                </li>
                <li role="none"><Link to="/schedule" role="menuitem">Расписание</Link></li>
                <li role="none"><Link to="/attendance-journal" role="menuitem">Журнал посещаемости</Link></li>
                <li role="none"><Link to="/events" role="menuitem">События</Link></li>
                <li role="none"><Link to="/press-center" role="menuitem">Пресс-центр</Link></li>
                <li role="none"><Link to="/online-store" role="menuitem">Интернет-магазин</Link></li>
                <li className="last-li" role="none"><Link to="/price" role="menuitem">Цены</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
