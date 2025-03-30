import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import "./online-store.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import Modal from "../../Components/Modal Window/Modal";
import { FiShoppingCart, FiZoomIn, FiChevronRight } from "react-icons/fi";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            } finally {
                setLoading(false);
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

    const OrderClick = (productName) => {
        const message = `Здравствуйте! Я хочу заказать товар: ${productName}`;
        window.open(`https://t.me/bychkov1203?text=${encodeURIComponent(message)}`, "_blank");
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
                {loading ? (
                    <div className="store-loading">
                        <div className="spinner"></div>
                        <p>Загрузка товаров...</p>
                    </div>
                ) : (
                    <>
                        <div className="store-grid">
                            {products.map(product => (
                                <article key={product._id} className="store-card">
                                    <figure className="store-image-wrapper" onClick={() => openModal(`${product.image}`)}>
                                        <img
                                            src={`${product.image}`}
                                            alt={product.text}
                                            className="store-image"
                                            loading="lazy"
                                        />
                                        <figcaption className="store-image-overlay">
                                            <FiZoomIn size={24} />
                                            <span>Увеличить</span>
                                        </figcaption>
                                        {product.isNew && <span className="new-badge">NEW</span>}
                                    </figure>
                                    <section className="store-details">
                                        <h3 className="store-name">{product.text}</h3>
                                        <div className="store-price-section">
                                            <p className="store-price">{product.price.toLocaleString()} ₽</p>
                                            {product.oldPrice && (
                                                <p className="store-old-price">{product.oldPrice.toLocaleString()} ₽</p>
                                            )}
                                        </div>
                                        <button
                                            className="store-order-button"
                                            onClick={() => OrderClick(product.text)}
                                        >
                                            <FiShoppingCart className="cart-icon" />
                                            Заказать
                                            <FiChevronRight className="arrow-icon" />
                                        </button>
                                    </section>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <Footer />
            <Modal active={modalActive} setActive={closeModal} imageSrc={selectedImage} />
        </>
    );
};

export default Store;