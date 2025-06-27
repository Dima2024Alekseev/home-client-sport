import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import grappling_video from "../../video/grappling.MP4";
import './style/directions-styles.css';
import { FaHandPaper, FaHistory, FaRunning, FaFire } from "react-icons/fa";

// Анимационный компонент (как в Boxing)
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

const Grappling = () => {
    return (
        <>
            <Helmet>
                <title>Грэпплинг - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о грэпплинге, его истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Грэпплинг, Академия боевых единоборств, Хулиган, боевые искусства, ММА, тренировки, спорт" />
                <link rel="canonical" href="https://hooliganmma.ru/grappling" />
            </Helmet>
            
                <Header
                    videoBackgroundDirections={true}
                    videoSrc={grappling_video}
                    showBlock={true}
                    innerTitle="Грэпплинг"
                    linkText="Грэпплинг"
                />
            
            <main className="content_directions">
                <div className="direction-features">
                    <AnimatedSection delay={0.1}>
                        <div className="feature-card">
                            <div className="feature-icon"><FaHandPaper /></div>
                            <h3>Универсальность</h3>
                            <p>Комбинация захватов, бросков и удержаний</p>
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
                            <h2><span className="highlight">Описание</span> грэпплинга</h2>
                            <p>
                                Грэпплинг — это боевое искусство и вид спорта, который фокусируется на борьбе в партере и стоя. В отличие от ударных боевых искусств, грэпплинг включает в себя техники захватов, бросков, удержаний, болевых и удушающих приемов. Этот вид спорта требует от спортсменов высокой физической подготовки, гибкости и стратегического мышления.
                            </p>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <section className="direction-section">
                            <h2><span className="highlight">История</span> грэпплинга</h2>
                            <p>
                                История грэпплинга уходит корнями в древние боевые искусства, такие как греко-римская борьба, дзюдо и самбо. Современный грэпплинг включает элементы из различных дисциплин, что делает его универсальным и эффективным для самообороны и спортивных соревнований.
                            </p>
                            <div className="history-grid">
                                <AnimatedSection delay={0.2}>
                                    <div className="history-item">
                                        <div className="history-year">Древняя Греция</div>
                                        <div className="history-desc">Греко-римская борьба</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.3}>
                                    <div className="history-item">
                                        <div className="history-year">1882</div>
                                        <div className="history-desc">Создание дзюдо</div>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="history-item">
                                        <div className="history-year">1938</div>
                                        <div className="history-desc">Развитие самбо в СССР</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <section className="direction-section">
                            <h2><span className="highlight">Основные элементы</span> грэпплинга</h2>
                            <p>
                                Основные элементы грэпплинга включают захваты и броски, удержания, болевые приемы и удушающие приемы. Тренировки в грэпплинге развивают силу, выносливость и координацию. Бои проводятся на матах, и победитель определяется по очкам, сдачей противника или дисквалификацией.
                            </p>
                            <div className="technique-grid">
                                <AnimatedSection delay={0.3}>
                                    <div className="technique-item">
                                        <h4>Захваты и броски</h4>
                                        <p>Техники для контроля противника</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.4}>
                                    <div className="technique-item">
                                        <h4>Удержания</h4>
                                        <p>Контроль противника на мате</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.5}>
                                    <div className="technique-item">
                                        <h4>Болевые приемы</h4>
                                        <p>Приемы для причинения боли</p>
                                    </div>
                                </AnimatedSection>
                                <AnimatedSection delay={0.6}>
                                    <div className="technique-item">
                                        <h4>Удушающие приемы</h4>
                                        <p>Приемы для ограничения дыхания</p>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <section className="direction-section">
                            <h2><span className="highlight">Популярность</span> грэпплинга</h2>
                            <p>
                                Сегодня грэпплинг является популярным видом спорта, привлекая миллионы зрителей и спортсменов по всему миру. Он также широко используется в смешанных единоборствах (ММА), где техники грэпплинга играют ключевую роль в победе.
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

export default Grappling;