import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
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

const Hand = () => {
    return (
        <>
            <Helmet>
                <title>Рукопашный бой - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о рукопашном бое, его истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Рукопашный бой, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
                <link rel="canonical" href="https://hooliganmma.pro/hand-to-hand" />
            </Helmet>
            
                <Header
                    showGradient={true}
                    showBlock={true}
                    innerTitle="Рукопашный бой"
                    homeRoute="/"
                    linkText="Рукопашный бой"
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
                            <p>Воспитание дисциплины и тактического мышления</p>
                        </div>
                    </AnimatedSection>
                </div>

                <article className="box direction-content">
                    <AnimatedSection>
                        <section className="direction-section">
                            <h2><span className="highlight">Описание</span> рукопашного боя</h2>
                            <p>
                                Рукопашный бой — это комплексное боевое искусство, которое объединяет элементы различных дисциплин для эффективной самообороны и боевых действий. Этот вид боевого искусства включает в себя ударную технику, борьбу, работу с оружием и тактические приемы. Рукопашный бой развивает физическую подготовку, выносливость, координацию и тактическое мышление.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <section className="direction-section">
                            <h2><span className="highlight">История</span> рукопашного боя</h2>
                            <p>
                                История рукопашного боя уходит корнями в древние времена, когда воины использовали различные техники для защиты и нападения. Современный рукопашный бой формировался на основе опыта военных и спецслужб, а также различных боевых искусств, таких как бокс, карате, дзюдо и самбо.
                            </p>
                            <div className="history-grid">
                                <AnimatedSection delay={0.2}>
                                    <div className="history-item">
                                        <div className="history-year">Древние времена</div>
                                        <div className="history-desc">Техники защиты и нападения</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.3}>
                                    <div className="history-item">
                                        <div className="history-year">XIX век</div>
                                        <div className="history-desc">Развитие военных техник</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="history-item">
                                        <div className="history-year">XX век</div>
                                        <div className="history-desc">Создание комплексных систем</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <section className="direction-section">
                            <h2><span className="highlight">Основные элементы</span> рукопашного боя</h2>
                            <p>
                                Основные элементы рукопашного боя включают ударную технику (удары руками и ногами), борьбу (захваты, броски и удержания), работу с оружием и тактические приемы для нейтрализации противника.
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
                                        <h4>Борьба</h4>
                                        <p>Захваты, броски и удержания</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.5}>
                                    <div className="technique-item">
                                        <h4>Работа с оружием</h4>
                                        <p>Использование различных видов оружия</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.6}>
                                    <div className="technique-item">
                                        <h4>Тактические приемы</h4>
                                        <p>Нейтрализация противника</p>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Тренировки</span> в рукопашном бою</h2>
                            <p>
                                Тренировки в рукопашном бою включают комплексный подход, развивающий силу, выносливость и координацию. Спортсмены также работают над тактикой и стратегией для эффективного использования своих навыков в реальных ситуациях.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <section className="direction-section">
                            <h2><span className="highlight">Практичность и эффективность</span></h2>
                            <p>
                                Рукопашный бой известен своей практичностью и эффективностью в реальных боевых условиях. Он широко используется в военных и спецслужбах, а также в гражданской самообороне. Тренировки помогают развить уверенность в своих силах и умение защищать себя и других в экстремальных ситуациях.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Популярность</span> рукопашного боя</h2>
                            <p>
                                Сегодня рукопашный бой является важной частью подготовки военных и правоохранительных органов, а также популярным видом спорта и самообороны среди гражданских лиц.
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

export default Hand;