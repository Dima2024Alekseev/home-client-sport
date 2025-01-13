import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import mmaVideo from "../../video/mma.mp4";
import './style/directions-styles.css';

const Mma = () => {
    return (
        <>
            <Header
                showBlock={true}
                title="MMA"
                innerTitle="MMA"
                homeRoute="/"
                linkText="MMA"
                videoBackgroundDirections={true}
                videoSrc={mmaVideo}
            />
            <main className="content_directions">
                <div className="box">
                    <p>
                        ММА (смешанные единоборства) — это полноконтактный боевой спорт, который объединяет техники из различных боевых искусств, таких как бокс, кикбоксинг, дзюдо, самбо и бразильское джиу-джитсу. Спортсмены используют удары, борьбу и болевые приемы, что делает ММА одним из самых универсальных и зрелищных видов спорта.
                    </p>
                    <p>
                        ММА начало набирать популярность в 1990-х годах с появлением Ultimate Fighting Championship (UFC). Эти соревнования позволили бойцам из разных дисциплин сражаться друг с другом, что привело к развитию новых стратегий и техник.
                    </p>
                    <p>
                        Тренировки в ММА включают комплексный подход, развивающий силу, выносливость и координацию. Бои проводятся в октагоне или ринге, и победитель определяется по очкам, нокаутом, техническим нокаутом или сдачей противника.
                    </p>
                    <p>
                        Сегодня ММА является одним из самых популярных видов спорта, привлекая миллионы зрителей и спортсменов по всему миру.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Mma;
