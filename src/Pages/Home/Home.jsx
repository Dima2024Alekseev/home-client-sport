import React, { useEffect, useState } from "react";
import "./home.css";
import Header from "../../Components/Header";
import NewsBlock from "../../Components/News-Block/News-Block";
import StoreBlock from "../../Components/Store-Block/Store-Block";
import Contact from "../../Components/Contact-Information/Contact-Information";
import Footer from "../../Components/Footer/Footer";
import postsData from "../../data/posts.json";
import home_page_video from "../../video/club_3.mp4";

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchPosts();
    }, []);
    return (
        <>
            <Header
                showVideoHomePages={true}
                videoSrc={home_page_video}
                title="Хулиган. Академия боевых единоборств"
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