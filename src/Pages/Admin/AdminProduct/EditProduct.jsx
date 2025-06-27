import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer/Footer';
import './adminproduct.css';

const EditorProduct = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductFile, setNewProductFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', {
                    headers: {
                        'Authorization': token
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
                toast.error('Ошибка при получении продуктов');
            }
        };

        fetchProducts();
    }, [token]);

    const handleEditClick = (productId, name, price) => {
        setEditingProductId(productId);
        setEditedName(name);
        setEditedPrice(price);
        setSelectedFile(null); // Сбрасываем выбранный файл при начале редактирования
    };

    const handleSaveClick = async (productId) => {
        if (!editedName || !editedPrice) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('text', editedName);
            formData.append('price', editedPrice);

            // Добавляем файл только если он был выбран
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            await axios.put(`/api/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            });

            // Обновляем список продуктов
            const response = await axios.get('/api/products', {
                headers: {
                    'Authorization': token
                }
            });

            setProducts(response.data);
            setEditingProductId(null);
            setSelectedFile(null);
            toast.success('Продукт успешно обновлен');
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error);
            toast.error(error.response?.data?.message || 'Ошибка при сохранении продукта');
        } finally {
            setIsLoading(false);
        }
    };

    // Остальные функции остаются без изменений
    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`, {
                headers: {
                    'Authorization': token
                }
            });

            const response = await axios.get('/api/products', {
                headers: {
                    'Authorization': token
                }
            });
            setProducts(response.data);
            toast.success('Продукт успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            toast.error('Ошибка при удалении продукта');
        }
    };

    const handleAddProduct = async () => {
        if (!newProductName || !newProductPrice || !newProductFile) {
            toast.error('Пожалуйста, заполните все поля и выберите изображение');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('text', newProductName);
            formData.append('price', newProductPrice);
            formData.append('image', newProductFile);

            await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            });

            const response = await axios.get('/api/products', {
                headers: {
                    'Authorization': token
                }
            });

            setProducts(response.data);
            setNewProductName('');
            setNewProductPrice('');
            setNewProductFile(null);
            toast.success('Продукт успешно добавлен');
        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
            toast.error(error.response?.data?.message || 'Ошибка при добавлении продукта');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleNewProductFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewProductFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Изменение интернет-магазина</title>
                <meta name="description" content="Редактирование интернет-магазина" />
                <meta name="keywords" content="интернет-магазин, редактирование, продукты" />
            </Helmet>
            <Header
                showGradient={true}
                showBlock={true}
                innerTitle='Редактирование интернет-магазина'
                homeRoute="/admin-dashboard"
                linkText='Редактирование интернет-магазина' />
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className={`product-image-wrapper ${editingProductId === product._id ? 'editing' : ''}`}>
                            <img
                                src={`${product.image}`}
                                alt={product.text}
                                className="product-image"
                            />
                            <div className="image-overlay">
                                <span>Выбрать</span>
                            </div>
                            {editingProductId === product._id && (
                                <div
                                    className="click-overlay"
                                    onClick={() => document.getElementById(`fileInput-${product._id}`).click()}
                                ></div>
                            )}
                            <input
                                type="file"
                                id={`fileInput-${product._id}`}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/jpeg, image/png"
                            />
                        </div>
                        <div className="product-details">
                            {editingProductId === product._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <input
                                        type="number"
                                        value={editedPrice}
                                        onChange={(e) => setEditedPrice(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="product-name">{product.text}</p>
                                    <p className="product-price">{product.price} ₽</p>
                                </>
                            )}
                        </div>
                        <div className="button-group">
                            {editingProductId === product._id ? (
                                <button
                                    className="save-button"
                                    onClick={() => handleSaveClick(product._id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                                </button>
                            ) : (
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditClick(product._id, product.text, product.price)}
                                    disabled={isLoading}
                                >
                                    Изменить
                                </button>
                            )}
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteClick(product._id)}
                                disabled={isLoading}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
                <div className="product-card add-product">
                    <div className="product-image-wrapper new-image-wrapper">
                        <div className="image-overlay">
                            <span>Выберите файл</span>
                        </div>
                        <div
                            className="click-overlay"
                            onClick={() => document.getElementById('newProductFileInput').click()}
                        ></div>
                        <input
                            type="file"
                            id="newProductFileInput"
                            style={{ display: 'none' }}
                            onChange={handleNewProductFileChange}
                            accept="image/jpeg, image/png"
                        />
                    </div>
                    <div className="product-details">
                        <div>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Цена"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <button
                        className="save-button"
                        onClick={handleAddProduct}
                        disabled={isLoading || !newProductName || !newProductPrice || !newProductFile}
                    >
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditorProduct;