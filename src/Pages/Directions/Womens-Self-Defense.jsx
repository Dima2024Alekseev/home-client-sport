import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import './style/directions-styles.css';
import { FaHandRock, FaHistory, FaRunning, FaFire } from "react-icons/fa";

const Women = () => {
    return (
        <>
            <Helmet>
                <title>Женская самооборона - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о женской самообороне, ее техниках и стратегиях в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Женская самооборона, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
            </Helmet>
            <Header
                showGradient={true}
                showBlock={true}
                innerTitle="Женская самооборона"
                linkText="Женская самооборона"
            />
            <main className="content_directions">
                <div className="direction-features">
                    <div className="feature-card">
                        <div className="feature-icon"><FaHandRock /></div>
                        <h3>Техники самообороны</h3>
                        <p>Обучение эффективным приемам</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FaHistory /></div>
                        <h3>Традиции</h3>
                        <p>Соединение лучших техник разных стилей</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FaRunning /></div>
                        <h3>Физическая форма</h3>
                        <p>Развитие всех физических качеств</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FaFire /></div>
                        <h3>Характер</h3>
                        <p>Воспитание уверенности и решительности</p>
                    </div>
                </div>

                <article className="box direction-content">
                    <section className="direction-section">
                        <h2><span className="highlight">Описание</span> женской самообороны</h2>
                        <p>
                            Женская самооборона — это специализированное направление, которое фокусируется на обучении женщин техникам и стратегиям для защиты себя в различных опасных ситуациях. Этот вид подготовки включает элементы различных боевых искусств, а также психологические и тактические приемы, которые помогают женщинам чувствовать себя увереннее и безопаснее.
                        </p>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Тренировки</span> в женской самообороне</h2>
                        <p>
                            Тренировки в женской самообороне развивают силу, выносливость, гибкость и координацию. Женщины учатся использовать свою интуицию и внимательность для предотвращения опасных ситуаций.
                        </p>
                        <div className="technique-grid">
                            <div className="technique-item">
                                <h4>Физическая подготовка</h4>
                                <p>Сила, выносливость, гибкость</p>
                            </div>
                            <div className="technique-item">
                                <h4>Психологическая подготовка</h4>
                                <p>Интуиция и внимательность</p>
                            </div>
                            <div className="technique-item">
                                <h4>Тактические приемы</h4>
                                <p>Предотвращение опасных ситуаций</p>
                            </div>
                        </div>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Практичность и эффективность</span></h2>
                        <p>
                            Женская самооборона известна своей практичностью и эффективностью в реальных условиях. Она помогает женщинам развить уверенность в своих силах и умение защищать себя и своих близких в экстремальных ситуациях.
                        </p>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Популярность</span> женской самообороны</h2>
                        <p>
                            Сегодня женская самооборона становится все более популярной, привлекая женщин всех возрастов и профессий. Она используется как в повседневной жизни, так и в профессиональных сферах, таких как правоохранительные органы и службы безопасности.
                        </p>
                    </section>
                </article>

                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Готовы начать тренировки?</h2>
                        <p>Запишитесь на пробное занятие прямо сейчас</p>
                        <Link to="/waiting-list" className="cta-button">Записаться</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Women;
