import React from "react";
import { Helmet } from "react-helmet";
import "./press-center.css";
import Header from "../../Components/Header";
import Posts from "../../Components/Post";
import Footer from "../../Components/Footer/Footer";

const Press = () => {
    return (
        <div id="root">
            <Helmet>
                <title>Пресс-центр - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Последние новости и обновления из Пресс-центра Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Пресс-центр, Академия боевых единоборств, Хулиган, новости, обновления, спорт" />
                <link rel="canonical" href="https://hooliganmma.pro/press-center" />
            </Helmet>
            <Header
                showBlock={true}
                homeRoute="/"
                innerTitle="Пресс-центр"
                linkText="Пресс-центр"
                showGradient={true}
            />
            <div className="news-container">
                <Posts />
            </div>
            <Footer />
        </div>
    );
};

export default Press;
