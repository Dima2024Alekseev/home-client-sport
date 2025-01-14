import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './store-slider.css';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import axios from 'axios';

const StoreBlock = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/products');
                setItems(response.data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        fetchItems();
    }, []);

    const hasEnoughSlides = items.length >= 3;

    return (
        <section className="online-store">
            <Swiper
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3
                    }
                }}
                loop={hasEnoughSlides} // Включаем режим цикла только если достаточно слайдов
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='content-store'>
                            <img src={`http://localhost:5000${item.image}`} alt={item.text} />
                            <p>{item.text}<br /><strong>{item.price} ₽</strong></p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="store-button">
                <Link to="/online-store">
                    <div className="button-style">
                        <p>В магазин</p>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default StoreBlock;
