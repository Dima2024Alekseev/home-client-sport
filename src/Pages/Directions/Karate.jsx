import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import karate_video from "../../video/karate.mp4";
import './style/directions-styles.css';
import { FaHandRock, FaHistory, FaRunning, FaFire } from "react-icons/fa";

// Анимационный компонент
const AnimatedSection = ({ children, delay = 0 }) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
            }}
        >
            {children}
        </div>
    );
};

const Karate = () => {
    return (
        <>
            <Helmet>
                <title>Каратэ - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о каратэ, его истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Каратэ, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
                <link rel="canonical" href="https://hooliganmma.ru/karate" />
            </Helmet>
            <Header
                videoBackgroundDirections={true}
                videoSrc={karate_video}
                showBlock={true}
                innerTitle="Каратэ"
                linkText="Каратэ"
            />
            <main className="content_directions">
                <div className="direction-features">
                    <AnimatedSection delay={0.1}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaHandRock /></div>
                            <h3>Ударная техника</h3>
                            <p>Развитие силы и точности ударов</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaHistory /></div>
                            <h3>Традиции</h3>
                            <p>Соединение лучших техник разных стилей</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaRunning /></div>
                            <h3>Физическая форма</h3>
                            <p>Развитие всех физических качеств</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaFire /></div>
                            <h3>Характер</h3>
                            <p>Воспитание дисциплины и концентрации</p>
                        </div>
                    </AnimatedSection>
                </div>

                <article className="box direction-content">
                    <AnimatedSection>
                        <section className="direction-section">
                            <h2><span className="highlight">Описание</span> каратэ</h2>
                            <p>
                                Каратэ — это традиционное японское боевое искусство, которое фокусируется на ударной технике руками и ногами, а также на защитных и контрприемах. Каратэ развивает физическую подготовку, дисциплину, координацию и концентрацию, делая его популярным как для самообороны, так и для спортивных соревнований.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <section className="direction-section">
                            <h2><span className="highlight">История</span> каратэ</h2>
                            <p>
                                История каратэ берет свое начало на острове Окинава, где оно развивалось как метод самообороны для местных жителей. В начале XX века каратэ начало распространяться по всей Японии и за ее пределами, став одним из самых известных и уважаемых боевых искусств в мире.
                            </p>
                            <div className="history-grid">
                                <AnimatedSection delay={0.2}>
                                    <div className="history-item">
                                        <div className="history-year">1609</div>
                                        <div className="history-desc">Запрет на ношение оружия на Окинаве</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.3}>
                                    <div className="history-item">
                                        <div className="history-year">1905</div>
                                        <div className="history-desc">Каратэ включено в школьную программу</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="history-item">
                                        <div className="history-year">1922</div>
                                        <div className="history-desc">Первая демонстрация каратэ в Японии</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <section className="direction-section">
                            <h2><span className="highlight">Основные элементы</span> каратэ</h2>
                            <p>
                                Основные элементы каратэ включают ударную технику (удары руками и ногами), ката (формальные упражнения), кумитэ (спарринги) и кихон (основные техники и движения).
                            </p>
                            <div className="technique-grid">
                                <AnimatedSection delay={0.3}>
                                    <div className="technique-item">
                                        <h4>Ударная техника</h4>
                                        <p>Удары руками и ногами</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="technique-item">
                                        <h4>Ката</h4>
                                        <p>Формальные упражнения</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.5}>
                                    <div className="technique-item">
                                        <h4>Кумитэ</h4>
                                        <p>Спарринги</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.6}>
                                    <div className="technique-item">
                                        <h4>Кихон</h4>
                                        <p>Основные техники и движения</p>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Тренировки</span> в каратэ</h2>
                            <p>
                                Тренировки в каратэ включают комплексный подход, развивающий силу, выносливость и координацию. Спортсмены также работают над дисциплиной и концентрацией, что помогает им эффективно использовать свои навыки в бою и повседневной жизни.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <section className="direction-section">
                            <h2><span className="highlight">Правила и судейство</span></h2>
                            <p>
                                Каратэ известно своими строгими правилами и судейством, которые обеспечивают безопасность участников и честность соревнований. Бои проводятся на татами, и победитель определяется по очкам или дисквалификацией.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Популярность</span> каратэ</h2>
                            <p>
                                Сегодня каратэ является популярным видом спорта по всему миру, привлекая миллионы зрителей и спортсменов. Оно также используется в смешанных единоборствах (ММА), где техники каратэ играют важную роль в ударной части боя.
                            </p>
                        </section>
                    </AnimatedSection>
                </article>

                <AnimatedSection delay={0.4}>
                    <section className="cta-section">
                        <div className="cta-content">
                            <h2>Готовы начать тренировки?</h2>
                            <p>Запишитесь на пробное занятие прямо сейчас</p>
                            <Link to="/waiting-list" className="cta-button">Записаться</Link>
                        </div>
                    </section>
                </AnimatedSection>
            </main>
            <Footer />
        </>
    );
};

export default Karate;