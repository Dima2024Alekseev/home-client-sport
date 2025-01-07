import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import "./admin-dashboard.css";

const AdminDashboard = () => {
    return (
        <>
            <Header
                title='Панель администратора'
                showBlock={true}
                innerTitle="Панель администратора"
                linkText="Панель администратора"
                showGradient={true}
            />
            <main className="admin-dashboard-content">
                <section className="admin-dashboard-section">
                    <h2>Расписание занятий</h2>
                    <Link to="/schedule-editor" className="admin-dashboard-link">Редактировать расписание</Link>
                </section>
                <section className="admin-dashboard-section">
                    <h2>Журнал посещаемости</h2>
                    <Link to="/attendance-journal" className="admin-dashboard-link">Редактировать журнал</Link>
                </section>
                <section className="admin-dashboard-section">
                    <h2>Прайс-лист</h2>
                    <Link to="/admin-price" className="admin-dashboard-link">Редактировать прайс-лист</Link>
                </section>
                <section className="admin-dashboard-section">
                    <h2>Интернет-магазин</h2>
                    <Link to="/admin-products" className="admin-dashboard-link">Редактировать интернет-магазин</Link>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;
