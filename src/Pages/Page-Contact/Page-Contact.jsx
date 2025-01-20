import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Contact from "../../Components/Contact-Information/Contact-Information";
import Footer from "../../Components/Footer/Footer";

const PageContact = () => {
    return (
        <>
            <Helmet>
                <title>Контакты - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Свяжитесь с нами для получения дополнительной информации о наших услугах и занятиях в Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Контакты, Академия боевых единоборств, Хулиган, боевые искусства, связь, информация" />
            </Helmet>
            <Header
                showGradient={true}
                showBlock={true}
                homeRoute="/"
                innerTitle='Контактная информация'
                linkText='Контакты'
            />
            <main>
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default PageContact;