import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./price.css";

const UserPrice = () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('/api/prices');
        setPriceData(response.data);
      } catch (error) {
        console.error('Ошибка при получении цен:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <Helmet>
        <title>Цены - Академия боевых единоборств "Хулиган"</title>
        <meta name="description" content="Узнайте о ценах на абонементы и услуги в Академии боевых единоборств 'Хулиган'." />
        <meta name="keywords" content="Цены, Академия боевых единоборств, Хулиган, абонементы, услуги, спорт" />
      </Helmet>
      <Header
        showGradient={true}
        showBlock={true}
        innerTitle='Абонемент'
        linkText='Цены'
      />
      <main className="price-container">
        <div className="price-grid">
          {priceData.map((price, index) => (
            <div key={index} className="price-card">
              <div className="price-title-wrapper">
                <div className="price-category">{price.category}</div>
                {price.duration && (
                  <div className="price-duration">{price.duration}</div>
                )}
              </div>

              <div className="price-amount">{price.price} ₽</div>

              <div className="price-description">
                {price.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserPrice;