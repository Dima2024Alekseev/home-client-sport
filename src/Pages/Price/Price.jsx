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
      <main className="training">
        {priceData.map((price, index) => (
          <article key={index} className="subscription">
            <section id="head-price">
              <h1>{price.price} ₽</h1>
              <h4>{price.category}</h4>
            </section>
            <section id="month-price">
              <h4>{price.duration}</h4>
            </section>
            <section>
              <p>{price.description}</p>
            </section>
          </article>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default UserPrice;
