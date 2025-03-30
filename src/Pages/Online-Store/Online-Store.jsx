import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import "./online-store.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import Modal from "../../Components/Modal Window/Modal";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalActive(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalActive(false);
    };

    const OrderClick = () => {
        window.open("https://t.me/bychkov1203", "_blank");
    };

    return (
        <>
            <Helmet>
                <title>Интернет-магазин - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Посетите наш интернет-магазин и приобретите товары для боевых единоборств в Академии 'Хулиган'." />
                <meta name="keywords" content="Интернет-магазин, Академия боевых единоборств, Хулиган, боевые искусства, товары, спорт" />
                <link rel="canonical" href="https://hooliganmma.ru/online-store" />
            </Helmet>
            <Header
                showGradient={true}
                showBlock={true}
                homeRoute="/"
                innerTitle="Интернет-магазин"
                linkText="Интернет-магазин"
            />
            <main className="store-grid">
                {products.map(product => (
                    <article key={product._id} className="store-card">
                        <figure className="store-image-wrapper" onClick={() => openModal(product.image)}>
                            <img
                                src={product.image}
                                alt={product.text}
                                className="store-image"
                            />
                            <figcaption className="store-image-overlay">
                                <span>Увеличить</span>
                            </figcaption>
                        </figure>
                        <section className="store-details">
                            <h3 className="store-name">{product.text}</h3>
                            <p className="store-price">{product.price} ₽</p>
                            <button className="store-order-button" onClick={OrderClick}>Заказать</button>
                        </section>
                    </article>
                ))}
            </main>
            <Footer />
            <Modal active={modalActive} setActive={closeModal} imageSrc={selectedImage} />
        </>
    );
};

export default Store;