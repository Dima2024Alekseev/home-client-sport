import React from "react";
import Header from "../../Components/Header";
import Contact from "../../Components/Contact-Information/Contact-Information";
import Footer from "../../Components/Footer/Footer";

const PageContact = () => {
    return (
        <>
            <Header
                showGradient={true}
                showBlock={true}
                title='Контакты'
                innerTitle='Контактная информация'
                linkText='Контакты' />
            <main>
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default PageContact;
