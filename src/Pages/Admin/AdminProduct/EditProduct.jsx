import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
                toast.error('Ошибка при получении продуктов');
            }
        };

        fetchProducts();
    }, []);

    const handleEditClick = (productId, name, price) => {
        setEditingProductId(productId);
        setEditedName(name);
        setEditedPrice(price);
    };

    const handleSaveClick = async (productId) => {
        try {
            const formData = new FormData();
            formData.append('text', editedName);
            formData.append('price', editedPrice);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            await axios.put(`/api/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const response = await axios.get('/api/products');
            setProducts(response.data);
            setEditingProductId(null);
            setSelectedFile(null);
            toast.success('Продукт успешно сохранен');
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error);
            toast.error('Ошибка при сохранении продукта');
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            const response = await axios.get('/api/products');
            setProducts(response.data);
            toast.success('Продукт успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            toast.error('Ошибка при удалении продукта');
        }
    };

    const handleAddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('text', newProductName);
            formData.append('price', newProductPrice);
            if (newProductFile) {
                formData.append('image', newProductFile);
            }

            await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const response = await axios.get('/api/products');
            setProducts(response.data); // Обновляем список продуктов
            setNewProductName('');
            setNewProductPrice('');
            setNewProductFile(null);
            toast.success('Продукт успешно добавлен');
        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
            toast.error('Ошибка при добавлении продукта');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleNewProductFileChange = (e) => {
        setNewProductFile(e.target.files[0]);
    };

    return (
        <div>
            <Header
                showGradient={true}
                title='Изменение интернет-магазина'
                showBlock={true}
                innerTitle='Редактирование интернет-магазина'
                linkText='Редактирование интернет-магазина' />
            <div className="product-grid">
                {products.map((product, index) => (
                    <div key={product._id} className="product-card">
                        <div className={`product-image-wrapper ${editingProductId === product._id ? 'editing' : ''}`}>
                            <img
                                src={product.image}
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
                            />
                        </div>
                        <div className="product-details">
                            {editingProductId === product._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        value={editedPrice}
                                        onChange={(e) => setEditedPrice(e.target.value)}
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
                                <button className="save-button" onClick={() => handleSaveClick(product._id)}>Сохранить</button>
                            ) : (
                                <button className="edit-button" onClick={() => handleEditClick(product._id, product.text, product.price)}>Изменить</button>
                            )}
                            <button className="delete-button" onClick={() => handleDeleteClick(product._id)}>Удалить</button>
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
                        />
                    </div>
                    <div className="product-details">
                        <div>
                            <input
                                type="text"
                                placeholder="Название"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Цена"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="save-button" onClick={handleAddProduct}>Добавить</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditorProduct;
