import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import boxing_and_kickboxing_video from "../../video/boxing_and_kickboxing.mp4";
import './style/directions-styles.css';
import { FaHandRock, FaHistory, FaRunning, FaFire } from "react-icons/fa";

const Kickboxing = () => {
    return (
        <>
            <Helmet>
                <title>Кикбоксинг - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о кикбоксинге, его истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Кикбоксинг, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
            </Helmet>
            <Header
                videoBackgroundDirections={true}
                videoSrc={boxing_and_kickboxing_video}
                showBlock={true}
                innerTitle="Кикбоксинг"
                linkText="Кикбоксинг"
            />
            <main className="content_directions">
                <div className="direction-features">
                    <div className="feature-card">
                        <div className="feature-icon"><FaHandRock /></div>
                        <h3>Ударная техника</h3>
                        <p>Развитие силы и точности ударов</p>
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
                        <p>Воспитание дисциплины и тактического мышления</p>
                    </div>
                </div>

                <article className="box direction-content">
                    <section className="direction-section">
                        <h2><span className="highlight">Описание</span> кикбоксинга</h2>
                        <p>
                            Кикбоксинг — это динамичное и зрелищное боевое искусство, которое сочетает в себе элементы бокса и ударной техники ногами. Этот вид спорта развивает силу, скорость, выносливость и координацию, делая его популярным как для самообороны, так и для спортивных соревнований.
                        </p>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">История</span> кикбоксинга</h2>
                        <p>
                            История кикбоксинга берет свое начало в 1960-х и 1970-х годах, когда боевые искусства, такие как карате и муай-тай, начали набирать популярность в США и Европе. Кикбоксинг объединил техники из этих дисциплин, создав уникальный стиль, который включает в себя удары руками и ногами.
                        </p>
                        <div className="history-grid">
                            <div className="history-item">
                                <div className="history-year">1960-е</div>
                                <div className="history-desc">Развитие карате и муай-тай</div>
                            </div>
                            <div className="history-item">
                                <div className="history-year">1970-е</div>
                                <div className="history-desc">Создание кикбоксинга</div>
                            </div>
                            <div className="history-item">
                                <div className="history-year">1980-е</div>
                                <div className="history-desc">Распространение по всему миру</div>
                            </div>
                        </div>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Основные элементы</span> кикбоксинга</h2>
                        <p>
                            Основные элементы кикбоксинга включают удары руками (джебы, хуки, апперкоты и кроссы) и удары ногами (фронт-кики, сайд-кики и раунд-кики). Тренировки в кикбоксинге включают кардио-упражнения, работу с мешками и спарринги.
                        </p>
                        <div className="technique-grid">
                            <div className="technique-item">
                                <h4>Удары руками</h4>
                                <p>Джебы, хуки, апперкоты, кроссы</p>
                            </div>
                            <div className="technique-item">
                                <h4>Удары ногами</h4>
                                <p>Фронт-кики, сайд-кики, раунд-кики</p>
                            </div>
                            <div className="technique-item">
                                <h4>Кардио-упражнения</h4>
                                <p>Работа с мешками и спарринги</p>
                            </div>
                        </div>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Правила и судейство</span></h2>
                        <p>
                            Кикбоксинг известен своими строгими правилами и судейством, которые обеспечивают безопасность участников и честность соревнований. Бои проводятся на ринге, и победитель определяется по очкам, нокаутом, техническим нокаутом или дисквалификацией.
                        </p>
                    </section>

                    <section className="direction-section">
                        <h2><span className="highlight">Популярность</span> кикбоксинга</h2>
                        <p>
                            Сегодня кикбоксинг является популярным видом спорта по всему миру, привлекая миллионы зрителей и спортсменов. Он также используется в смешанных единоборствах (ММА), где техники кикбоксинга играют важную роль в ударной части боя.
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

export default Kickboxing;
