import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import mmaVideo from "../../video/mma.mp4";
import './style/directions-styles.css';

const Mma = () => {
    return (
        <>
            <Helmet>
                <title>MMA - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о смешанных единоборствах (MMA), их истории, техниках и тренировках в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="MMA, Академия боевых единоборств, Хулиган, боевые искусства, самооборона, тренировки, спорт" />
            </Helmet>
            <Header
                showBlock={true}
                innerTitle="MMA"
                linkText="MMA"
                videoBackgroundDirections={true}
                videoSrc={mmaVideo}
            />
            <main className="content_directions">
                <article className="box">
                    <section>
                        <h2>Описание MMA</h2>
                        <p>
                            ММА (смешанные единоборства) — это полноконтактный боевой спорт, который объединяет техники из различных боевых искусств, таких как бокс, кикбоксинг, дзюдо, самбо и бразильское джиу-джитсу. Спортсмены используют удары, борьбу и болевые приемы, что делает ММА одним из самых универсальных и зрелищных видов спорта.
                        </p>
                    </section>
                    <section>
                        <h2>История MMA</h2>
                        <p>
                            ММА начало набирать популярность в 1990-х годах с появлением Ultimate Fighting Championship (UFC). Эти соревнования позволили бойцам из разных дисциплин сражаться друг с другом, что привело к развитию новых стратегий и техник.
                        </p>
                    </section>
                    <section>
                        <h2>Тренировки в MMA</h2>
                        <p>
                            Тренировки в ММА включают комплексный подход, развивающий силу, выносливость и координацию. Бои проводятся в октагоне или ринге, и победитель определяется по очкам, нокаутом, техническим нокаутом или сдачей противника.
                        </p>
                    </section>
                    <section>
                        <h2>Популярность MMA</h2>
                        <p>
                            Сегодня ММА является одним из самых популярных видов спорта, привлекая миллионы зрителей и спортсменов по всему миру.
                        </p>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default Mma;