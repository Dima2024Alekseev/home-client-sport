import React from "react";
import "./press-center.css";
import Header from "../../Components/Header";
import Posts from "../../Components/Post";
import Footer from "../../Components/Footer/Footer";

const Press = () => {
    return (
        <div id="root">
            <Header
                title="Пресс-центр"
                showBlock={true}
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
