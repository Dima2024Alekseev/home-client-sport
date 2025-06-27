import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import mmaVideo from "../../video/mma.mp4";
import './style/directions-styles.css';
import { FaFistRaised, FaHistory, FaRunning, FaFire } from "react-icons/fa";

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

const Mma = () => {
    return (
        <>
            <Helmet>
                <title>MMA - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о смешанных единоборствах (MMA), их истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="MMA, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
                <link rel="canonical" href="https://hooliganmma.ru/mma" />
            </Helmet>
            
            
                <Header
                    showBlock={true}
                    innerTitle="Смешанные единоборства (MMA)"
                    linkText="MMA"
                    videoBackgroundDirections={true}
                    videoSrc={mmaVideo}
                />
            
            
            <main className="content_directions">
                <div className="direction-features">
                    <AnimatedSection delay={0.1}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaFistRaised /></div>
                            <h3>Универсальность</h3>
                            <p>Комбинация ударной и борцовской техник</p>
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
                            <p>Воспитание бойцовского духа</p>
                        </div>
                    </AnimatedSection>
                </div>

                <article className="box direction-content">
                    <AnimatedSection>
                        <section className="direction-section">
                            <h2><span className="highlight">Описание</span> MMA</h2>
                            <p>
                                ММА (смешанные единоборства) — это полноконтактный боевой спорт, который объединяет техники из различных боевых искусств, таких как бокс, кикбоксинг, дзюдо, самбо и бразильское джиу-джитсу. Спортсмены используют удары, борьбу и болевые приемы, что делает ММА одним из самых универсальных и зрелищных видов спорта.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <section className="direction-section">
                            <h2><span className="highlight">История</span> MMA</h2>
                            <p>
                                ММА начало набирать популярность в 1990-х годах с появлением Ultimate Fighting Championship (UFC). Эти соревнования позволили бойцам из разных дисциплин сражаться друг с другом, что привело к развитию новых стратегий и техник.
                            </p>
                            <div className="history-grid">
                                <AnimatedSection delay={0.2}>
                                    <div className="history-item">
                                        <div className="history-year">1993</div>
                                        <div className="history-desc">Первый турнир UFC</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.3}>
                                    <div className="history-item">
                                        <div className="history-year">2001</div>
                                        <div className="history-desc">Приобретение UFC компанией Zuffa</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="history-item">
                                        <div className="history-year">2005</div>
                                        <div className="history-desc">Выход The Ultimate Fighter на TV</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <section className="direction-section">
                            <h2><span className="highlight">Тренировки</span> в MMA</h2>
                            <p>
                                Тренировки в ММА включают комплексный подход, развивающий силу, выносливость и координацию. Бои проводятся в октагоне или ринге, и победитель определяется по очкам, нокаутом, техническим нокаутом или сдачей противника.
                            </p>
                            <div className="technique-grid">
                                <AnimatedSection delay={0.3}>
                                    <div className="technique-item">
                                        <h4>Ударная техника</h4>
                                        <p>Бокс, кикбоксинг, муай-тай</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="technique-item">
                                        <h4>Борьба</h4>
                                        <p>Грепплинг, дзюдо, вольная борьба</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.5}>
                                    <div className="technique-item">
                                        <h4>Клинч</h4>
                                        <p>Работа у сетки, колени, локти</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.6}>
                                    <div className="technique-item">
                                        <h4>Партер</h4>
                                        <p>Позиции, болевые, удушения</p>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Популярность</span> MMA</h2>
                            <p>
                                Сегодня ММА является одним из самых популярных видов спорта, привлекая миллионы зрителей и спортсменов по всему миру благодаря своей динамичности и зрелищности.
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

export default Mma;