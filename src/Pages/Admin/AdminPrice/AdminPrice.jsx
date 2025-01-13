import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import { toast, Toaster } from 'react-hot-toast';
import "./adminprice.css";

const AdminPrice = () => {
    const [priceData, setPriceData] = useState([]);
    const [newPrice, setNewPrice] = useState({
        category: '',
        price: '',
        duration: '',
        description: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('/api/prices');
                setPriceData(response.data);
            } catch (error) {
                console.error('Ошибка при получении цен:', error);
                toast.error('Ошибка при получении цен');
            }
        };

        fetchPrices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPrice({
            ...newPrice,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/prices', { prices: [newPrice] });
            console.log('Данные успешно добавлены:', response.data);
            // Обновляем данные после добавления новой записи
            const updatedPriceData = await axios.get('/api/prices');
            setPriceData(updatedPriceData.data);
            setNewPrice({
                category: '',
                price: '',
                duration: '',
                description: ''
            });
            toast.success('Прайс-лист успешно добавлен');
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            toast.error('Ошибка при добавлении данных');
        }
    };

    const handleUpdate = async (index) => {
        const updatedPrice = priceData[index];
        try {
            const response = await axios.put('/api/prices', { price: updatedPrice });
            console.log('Данные успешно обновлены:', response.data);
            const updatedPriceData = [...priceData];
            updatedPriceData[index] = response.data.price;
            setPriceData(updatedPriceData);
            toast.success('Прайс-лист успешно обновлен');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            toast.error('Ошибка при обновлении данных');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/prices/${id}`);
            console.log('Данные успешно удалены:', response.data);
            // Обновляем данные после удаления записи
            const updatedPriceData = await axios.get('/api/prices');
            setPriceData(updatedPriceData.data);
            toast.success('Прайс-лист успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении данных:', error);
            toast.error('Ошибка при удалении данных');
        }
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPriceData = [...priceData];
        updatedPriceData[index][name] = value;
        setPriceData(updatedPriceData);
    };

    return (
        <>
            <Toaster position="bottom-right" />
            <Header
                showGradient={true}
                title='Изменение прайс-листа'
                showBlock={true}
                innerTitle='Редактирование прайс-листа'
                homeRoute="/admin-dashboard"
                linkText='Редактирование прайс-листа'
            />
            <main className="admin-price-main">
                <button className="admin-price-add-button" onClick={() => setShowForm(!showForm)}>
                    <span>{showForm ? '-' : '+'}</span> {showForm ? "Свернуть" : "Добавить новую карточку"}
                </button>
                {showForm && (
                    <form className="admin-price-form" onSubmit={handleSubmit}>
                        <div className="admin-price-form-group">
                            <label>Категория:</label>
                            <input type="text" name="category" value={newPrice.category} onChange={handleChange} required />
                        </div>
                        <div className="admin-price-form-group">
                            <label>Цена:</label>
                            <input type="number" name="price" value={newPrice.price} onChange={handleChange} required />
                        </div>
                        <div className="admin-price-form-group">
                            <label>Длительность:</label>
                            <input type="text" name="duration" value={newPrice.duration} onChange={handleChange} />
                        </div>
                        <div className="admin-price-form-group">
                            <label>Описание:</label>
                            <input type="text" name="description" value={newPrice.description} onChange={handleChange} />
                        </div>
                        <button type="submit" className="admin-price-form-button">Добавить</button>
                    </form>
                )}
                <div className="admin-price-subscriptions">
                    {priceData.map((price, index) => (
                        <section key={price._id} className="admin-price-subscription">
                            <div className="admin-price-subscription-head">
                                <input
                                    type="number"
                                    name="price"
                                    value={price.price}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={price.category}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="admin-price-subscription-duration">
                                <input
                                    type="text"
                                    name="duration"
                                    value={price.duration}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="admin-price-subscription-description">
                                <input
                                    type="text"
                                    name="description"
                                    value={price.description}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="price-position-button">
                                <button className="admin-price-subscription-save" onClick={() => handleUpdate(index)}>Сохранить</button>
                                <button className="admin-price-subscription-delete" onClick={() => handleDelete(price._id)}>Удалить</button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminPrice;
