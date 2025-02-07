import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./home.css";
import Header from "../../Components/Header";
import NewsBlock from "../../Components/News-Block/News-Block";
import StoreBlock from "../../Components/Store-Block/Store-Block";
import Contact from "../../Components/Contact-Information/Contact-Information";
import Footer from "../../Components/Footer/Footer";
import home_page_video from "../../video/club_3.mp4";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                const data = await response.json();

                // Сортировка постов по убыванию идентификаторов
                const sortedPosts = data.sort((a, b) => b.id - a.id);
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Хулиган. Академия боевых единоборств</title>
                <meta name="description" content="Добро пожаловать в Академию боевых единоборств 'Хулиган'. Узнайте о наших новостях, магазине и контактной информации." />
                <meta name="keywords" content="Хулиган, Академия боевых единоборств, боевые искусства, новости, магазин, контакты" />
            </Helmet>
            <Header
                showVideoHomePages={true}
                videoSrc={home_page_video}
            />
            <main>
                <NewsBlock posts={posts} />
                <StoreBlock />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
