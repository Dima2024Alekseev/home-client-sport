import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./price.css";

const UserPrice = () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prices');
        setPriceData(response.data);
      } catch (error) {
        console.error('Ошибка при получении цен:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <Header
        showGradient={true}
        title='Цены'
        showBlock={true}
        innerTitle='Абонемент'
        linkText='Цены'
      />
      <main className="training">
        {priceData.map((price, index) => (
          <section key={index} className="subscription">
            <div id="head-price">
              <h1>{price.price} ₽</h1>
              <h4>{price.category}</h4>
            </div>
            <div id="month-price">
              <h4>{price.duration}</h4>
            </div>
            <div>
              <p>{price.description}</p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default UserPrice;
