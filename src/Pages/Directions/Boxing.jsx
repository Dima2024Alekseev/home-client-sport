import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import boxing_and_kickboxing_video from "../../video/boxing_and_kickboxing.mp4";
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

const Boxing = () => {
  return (
    <>
      <Helmet>
        <title>Бокс - Академия боевых единоборств "Хулиган"</title>
        <meta name="description" content="Узнайте больше о боксе, его истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
        <meta name="keywords" content="Бокс, Академия боевых единоборств, Хулиган, боевые искусства, ММА, тренировки, спорт" />
        <link rel="canonical" href="https://hooliganmma.pro/boxing" />
      </Helmet>
      
        <Header
          videoBackgroundDirections={true}
          videoSrc={boxing_and_kickboxing_video}
          showBlock={true}
          innerTitle="Бокс"
          homeRoute="/"
          linkText="Бокс"
        />
      
      <main className="content_directions">
        <div className="direction-features">
          <AnimatedSection delay={0.1}>
            <div className="feature-card">
              <div className="feature-icon"><FaHandRock /></div>
              <h3>Ударная техника</h3>
              <p>Развитие силы и скорости ударов</p>
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
              <h2><span className="highlight">Описание</span> бокса</h2>
              <p>
                Бокс — это один из самых популярных и древних видов боевых искусств, который фокусируется на ударной технике руками. В боксе спортсмены используют только кулаки для нанесения ударов, что делает его уникальным среди других боевых искусств. Бокс развивает силу, скорость, выносливость и тактическое мышление.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <section className="direction-section">
              <h2><span className="highlight">История</span> бокса</h2>
              <p>
                История бокса уходит корнями в древние времена. В Древней Греции и Риме бокс был частью Олимпийских игр. Современный бокс начал формироваться в Англии в XVIII веке, когда были установлены первые правила и созданы боксерские клубы.
              </p>
              <div className="history-grid">
                <AnimatedSection delay={0.2}>
                  <div className="history-item">
                    <div className="history-year">Древняя Греция</div>
                    <div className="history-desc">Олимпийские игры</div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <div className="history-item">
                    <div className="history-year">1743</div>
                    <div className="history-desc">Первые правила бокса</div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <div className="history-item">
                    <div className="history-year">1867</div>
                    <div className="history-desc">Создание правил Маркиза Куинсберри</div>
                  </div>
                </AnimatedSection>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <section className="direction-section">
              <h2><span className="highlight">Основные элементы</span> бокса</h2>
              <p>
                Основные элементы бокса включают удары (джебы, хуки, апперкоты и кроссы), защиту (блоки, уклоны) и футворк (движение ног для поддержания дистанции и создания углов для атаки). Тренировки в боксе включают кардио-упражнения, работу с мешками и спарринги.
              </p>
              <div className="technique-grid">
                <AnimatedSection delay={0.3}>
                  <div className="technique-item">
                    <h4>Удары</h4>
                    <p>Джебы, хуки, апперкоты, кроссы</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <div className="technique-item">
                    <h4>Защита</h4>
                    <p>Блоки, уклоны</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.5}>
                  <div className="technique-item">
                    <h4>Футворк</h4>
                    <p>Движение ног для поддержания дистанции</p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.6}>
                  <div className="technique-item">
                    <h4>Кардио-упражнения</h4>
                    <p>Работа с мешками и спарринги</p>
                  </div>
                </AnimatedSection>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <section className="direction-section">
              <h2><span className="highlight">Правила и судейство</span></h2>
              <p>
                Бокс известен своими строгими правилами и судейством, которые обеспечивают безопасность участников и честность соревнований. Бои проводятся на ринге, и победитель определяется по очкам, нокаутом, техническим нокаутом или дисквалификацией.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <section className="direction-section">
              <h2><span className="highlight">Популярность</span> бокса</h2>
              <p>
                Сегодня бокс является одним из самых популярных видов спорта в мире, привлекая миллионы зрителей и спортсменов. Он также используется в смешанных единоборствах (ММА), где техники бокса играют важную роль в ударной части боя.
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

export default Boxing;