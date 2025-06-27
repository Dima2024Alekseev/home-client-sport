// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaCalendarAlt, FaClipboardList, FaMoneyBillWave, FaShoppingCart, FaAd } from 'react-icons/fa';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import "./admin-dashboard.css";

const AdminDashboard = () => {
    return (
        <>
            <Helmet>
                <title>Панель администратора - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Панель администратора для управления расписанием, журналом посещаемости, прайс-листом и интернет-магазином Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Панель администратора, Академия боевых единоборств, Хулиган, управление, расписание, журнал посещаемости, прайс-лист, интернет-магазин" />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Header
                showBlock={true}
                innerTitle="Панель администратора"
                linkText="Панель администратора"
                homeRoute="/"
                showGradient={true}
            />

            <main className="admin-dashboard-container">
                <div className="admin-dashboard-grid">
                    <DashboardCard
                        title="Расписание занятий"
                        description="Управление графиком тренировок"
                        linkText="Редактировать расписание"
                        to="/schedule-editor"
                        icon={<FaCalendarAlt className="card-icon" />}
                    />

                    <DashboardCard
                        title="Журнал посещаемости"
                        description="Контроль посещаемости студентов и статистика"
                        linkText="Открыть журнал"
                        to="/admin/attendance-journal"
                        icon={<FaClipboardList className="card-icon" />}
                    />

                    <DashboardCard
                        title="Прайс-лист"
                        description="Управление абонементами"
                        linkText="Редактировать цены"
                        to="/admin-price"
                        icon={<FaMoneyBillWave className="card-icon" />}
                    />

                    <DashboardCard
                        title="Интернет-магазин"
                        description="Управление товарами"
                        linkText="Перейти в магазин"
                        to="/admin-products"
                        icon={<FaShoppingCart className="card-icon" />}
                    />

                    <DashboardCard
                        title="Редактирование рекламы"
                        description="Изменение изображения рекламы и управление состоянием"
                        linkText="Редактировать рекламу"
                        to="/edit-ad"
                        icon={<FaAd className="card-icon" />}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

const DashboardCard = ({ title, description, linkText, to, icon }) => {
    return (
        <div className="dashboard-card">
            <div className="icon-container">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link to={to} className="card-button">
                {linkText}
            </Link>
        </div>
    );
};

export default AdminDashboard;
