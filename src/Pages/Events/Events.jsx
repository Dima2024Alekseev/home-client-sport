import React from "react";
import { Helmet } from "react-helmet";
import "./events.css";
import Header from "../../Components/Header";
import Posts from "../../Components/Post";
import Footer from "../../Components/Footer/Footer";

const Events = () => {
    return (
        <>
            <Helmet>
                <title>События - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте о предстоящих событиях и мероприятиях в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="События, Академия боевых единоборств, Хулиган, боевые искусства, мероприятия, спорт" />
            </Helmet>
            <Header
                showBlock={true}
                showGradient={true}
                innerTitle="События Академии"
                homeRoute="/"
                linkText="События"
            />
            <main className="events-container">
                <Posts filterTag="#афиша" />
            </main>
            <Footer />
        </>
    );
};

export default Events;
