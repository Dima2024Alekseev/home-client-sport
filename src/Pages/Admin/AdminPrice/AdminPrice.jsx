import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer/Footer";
import { toast, Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { FiPlus, FiX, FiSave, FiTrash2, FiEdit } from 'react-icons/fi';
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
    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Требуется авторизация');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/prices', {
                    headers: {
                        'Authorization': token
                    }
                });
                setPriceData(response.data);
            } catch (error) {
                console.error('Ошибка при получении цен:', error);
                toast.error('Ошибка при получении цен');
            } finally {
                setIsLoading(false);
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
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Требуется авторизация');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/prices', { prices: [newPrice] }, {
                headers: {
                    'Authorization': token
                }
            });

            setPriceData([...priceData, response.data.prices[0]]);
            setNewPrice({
                category: '',
                price: '',
                duration: '',
                description: ''
            });
            setShowForm(false);
            toast.success('Позиция успешно добавлена');
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            toast.error('Ошибка при добавлении данных');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Требуется авторизация');
                return;
            }

            const priceToUpdate = priceData.find(item => item._id === id);
            await axios.put('http://localhost:5000/api/prices', { price: priceToUpdate }, {
                headers: {
                    'Authorization': token
                }
            });

            setEditingId(null);
            toast.success('Изменения сохранены');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            toast.error('Ошибка при обновлении данных');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту позицию?')) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Требуется авторизация');
                return;
            }

            await axios.delete(`http://localhost:5000/api/prices/${id}`, {
                headers: {
                    'Authorization': token
                }
            });

            setPriceData(priceData.filter(item => item._id !== id));
            toast.success('Позиция удалена');
        } catch (error) {
            console.error('Ошибка при удалении данных:', error);
            toast.error('Ошибка при удалении данных');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (id, e) => {
        const { name, value } = e.target;
        setPriceData(priceData.map(item =>
            item._id === id ? { ...item, [name]: value } : item
        ));
    };

    const startEditing = (id) => {
        setEditingId(id);
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    return (
        <>
            <Helmet>
                <title>Управление прайс-листом</title>
                <meta name="description" content="Редактирование прайс-листа" />
                <meta name="keywords" content="прайс-лист, редактирование, администрирование" />
            </Helmet>

            <Header
                showGradient={true}
                showBlock={true}
                innerTitle='Управление прайс-листом'
                homeRoute="/admin-dashboard"
                linkText='Управление прайс-листом'
            />
            <main className="admin-price-main">
                <div className="admin-price-header">
                    <button
                        className="admin-price-add-button"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                        }}
                        disabled={isLoading}
                        aria-label={showForm ? "Закрыть форму" : "Добавить новую позицию"}
                    >
                        {showForm ? <FiX size={18} /> : <FiPlus size={18} />}
                        {showForm ? "Отмена" : "Добавить позицию"}
                    </button>
                </div>

                {showForm && (
                    <form className="admin-price-form" onSubmit={handleSubmit}>
                        <h3>Добавить новую позицию</h3>
                        <div className="admin-price-form-grid">
                            <div className="admin-price-form-group">
                                <label htmlFor="category">Категория:</label>
                                <input
                                    id="category"
                                    type="text"
                                    name="category"
                                    value={newPrice.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="admin-price-form-group">
                                <label htmlFor="price">Цена (₽):</label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={newPrice.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="admin-price-form-group">
                                <label htmlFor="duration">Длительность:</label>
                                <input
                                    id="duration"
                                    type="text"
                                    name="duration"
                                    value={newPrice.duration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="admin-price-form-group">
                                <label htmlFor="description">Описание:</label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={newPrice.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="admin-price-form-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>
                                    <FiSave size={16} /> Добавить
                                </>
                            )}
                        </button>
                    </form>
                )}

                {isLoading && !showForm && priceData.length === 0 ? (
                    <div className="admin-price-loading">
                        <div className="loading-spinner"></div>
                        <p>Загрузка данных...</p>
                    </div>
                ) : (
                    <div className="admin-price-list">
                        {priceData.map((price) => (
                            <div key={price._id} className="admin-price-card">
                                <div className="admin-price-card-header">
                                    {editingId === price._id ? (
                                        <input
                                            type="text"
                                            name="category"
                                            value={price.category}
                                            onChange={(e) => handleInputChange(price._id, e)}
                                            className="admin-price-card-title"
                                            required
                                        />
                                    ) : (
                                        <h3>{price.category}</h3>
                                    )}
                                    <div className="admin-price-card-price">
                                        {editingId === price._id ? (
                                            <input
                                                type="number"
                                                name="price"
                                                value={price.price}
                                                onChange={(e) => handleInputChange(price._id, e)}
                                                required
                                                min="0"
                                            />
                                        ) : (
                                            <span>{price.price}</span>
                                        )}
                                        <span>₽</span>
                                    </div>
                                </div>

                                <div className="admin-price-card-field">
                                    <label>Длительность:</label>
                                    {editingId === price._id ? (
                                        <input
                                            type="text"
                                            name="duration"
                                            value={price.duration}
                                            onChange={(e) => handleInputChange(price._id, e)}
                                        />
                                    ) : (
                                        <p>{price.duration || "Не указано"}</p>
                                    )}
                                </div>

                                <div className="admin-price-card-field">
                                    <label>Описание:</label>
                                    {editingId === price._id ? (
                                        <input
                                            type="text"
                                            name="description"
                                            value={price.description}
                                            onChange={(e) => handleInputChange(price._id, e)}
                                        />
                                    ) : (
                                        <p>{price.description || "Нет описания"}</p>
                                    )}
                                </div>

                                <div className="admin-price-card-actions">
                                    {editingId === price._id ? (
                                        <>
                                            <button
                                                className="admin-price-card-cancel"
                                                onClick={cancelEditing}
                                                disabled={isLoading}
                                            >
                                                <FiX size={14} /> Отмена
                                            </button>
                                            <button
                                                className="admin-price-card-save"
                                                onClick={() => handleUpdate(price._id)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="loading-spinner small"></span>
                                                ) : (
                                                    <>
                                                        <FiSave size={14} /> Сохранить
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="admin-price-card-edit"
                                                onClick={() => startEditing(price._id)}
                                                disabled={isLoading || editingId !== null}
                                            >
                                                <FiEdit size={14} /> Редактировать
                                            </button>
                                            <button
                                                className="admin-price-card-delete"
                                                onClick={() => handleDelete(price._id)}
                                                disabled={isLoading || editingId !== null}
                                            >
                                                <FiTrash2 size={14} /> Удалить
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default AdminPrice;