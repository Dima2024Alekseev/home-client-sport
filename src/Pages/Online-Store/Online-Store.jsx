import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import "./online-store.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import Modal from "../../Components/Modal Window/Modal";
import { FaShoppingCart, FaStar, FaSearchPlus } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
                setIsLoading(false);
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

    const renderRating = (rating) => {
        return (
            <div className="store-rating">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={i < rating ? "store-star filled" : "store-star"}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <Helmet>
                <title>Интернет-магазин - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Посетите наш интернет-магазин и приобретите товары для боевых единоборств в Академии 'Хулиган'." />
                <meta name="keywords" content="Интернет-магазин, Академия боевых единоборств, Хулиган, боевые искусства, товары, спорт" />
            </Helmet>
            <Header
                showGradient={true}
                showBlock={true}
                innerTitle="Интернет-магазин"
                linkText="Интернет-магазин"
            />

            <main className="store-container">
                {isLoading ? (
                    <div className="store-loading">
                        <div className="store-spinner"></div>
                        <p>Загрузка товаров...</p>
                    </div>
                ) : (
                    <div className="store-grid">
                        {products.map(product => (
                            <article key={product._id} className="store-card">
                                {product.isNew && (
                                    <div className="store-badge new">
                                        <IoIosFlash className="store-flash-icon" /> Новинка
                                    </div>
                                )}
                                {product.discount > 0 && (
                                    <div className="store-badge discount">
                                        -{product.discount}%
                                    </div>
                                )}
                                <figure className="store-image-wrapper" onClick={() => openModal(`${product.image}`)}>
                                    <img
                                        src={`${product.image}`}
                                        alt={product.text}
                                        className="store-image"
                                        loading="lazy"
                                    />
                                    <figcaption className="store-image-overlay">
                                        <FaSearchPlus className="store-zoom-icon" />
                                        <span>Быстрый просмотр</span>
                                    </figcaption>
                                </figure>
                                <section className="store-details">
                                    <h3 className="store-name">{product.text}</h3>
                                    {product.rating && renderRating(product.rating)}
                                    <div className="store-price-container">
                                        {product.discount > 0 ? (
                                            <>
                                                <p className="store-price old-price">{product.price} ₽</p>
                                                <p className="store-price discount-price">
                                                    {Math.round(product.price * (1 - product.discount / 100))} ₽
                                                </p>
                                            </>
                                        ) : (
                                            <p className="store-price">{product.price} ₽</p>
                                        )}
                                    </div>
                                    <button className="store-order-button" onClick={OrderClick}>
                                        <FaShoppingCart className="store-icon" /> В корзину
                                    </button>
                                </section>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            <Modal active={modalActive} setActive={closeModal} imageSrc={selectedImage} />
        </>
    );
};

export default Store;