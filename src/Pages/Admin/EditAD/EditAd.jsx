// Pages/Admin/EditAd/EditAd.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiUpload, FiImage, FiToggleLeft, FiToggleRight, FiLink } from 'react-icons/fi';
import './edit-ad.css';

const EditAd = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [buttonLink, setButtonLink] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAdActive, setIsAdActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAdData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Требуется авторизация');
                    return;
                }

                const response = await axios.get('/api/admin/ad-status', {
                    headers: {
                        'Authorization': token
                    }
                });
                setImageUrl(response.data.imageUrl);
                setButtonLink(response.data.buttonLink);
                setIsAdActive(response.data.isActive);
            } catch (error) {
                console.error('Error fetching ad data:', error);
                toast.error('Не удалось загрузить данные рекламы');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdData();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) {
            toast.error('Пожалуйста, выберите изображение');
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Требуется авторизация');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('/api/admin/upload-ad-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            });
            setImageUrl(response.data.imageUrl);
            setSelectedFile(null);
            toast.success('Изображение рекламы успешно загружено');
        } catch (error) {
            console.error('Error uploading ad image:', error);
            toast.error('Ошибка при загрузке изображения');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAd = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Требуется авторизация');
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('/api/admin/toggle-ad', {}, {
                headers: {
                    'Authorization': token
                }
            });
            setIsAdActive(prev => !prev);
            toast.success(`Реклама ${!isAdActive ? 'включена' : 'отключена'}`);
        } catch (error) {
            console.error('Error toggling ad:', error);
            toast.error('Ошибка при изменении состояния рекламы');
        } finally {
            setIsLoading(false);
        }
    };

    const updateButtonLink = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Требуется авторизация');
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('/api/admin/update-ad-button-link', { buttonLink }, {
                headers: {
                    'Authorization': token
                }
            });
            toast.success('Ссылка кнопки рекламы успешно обновлена');
        } catch (error) {
            console.error('Error updating ad button link:', error);
            toast.error('Ошибка при обновлении ссылки кнопки рекламы');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Редактирование рекламы - Академия боевых единоборств "Хулиган"</title>
                <meta name="description" content="Редактирование рекламы для Академии боевых единоборств 'Хулиган'." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Header
                showBlock={true}
                innerTitle="Редактирование рекламы"
                linkText="Редактирование рекламы"
                showGradient={true}
            />

            <main className="edit-ad-container">
                <div className="edit-ad-card">
                    <div className="image-section">
                        <h3 className="section-title">
                            <FiImage className="section-icon" /> Текущее изображение
                        </h3>
                        {imageUrl ? (
                            <div className="image-preview-container">
                                <img
                                    src={`${imageUrl}`}
                                    alt="Текущее изображение рекламы"
                                    className="current-image"
                                />
                            </div>
                        ) : (
                            <p className="no-image-message">Изображение не загружено</p>
                        )}
                    </div>

                    <div className="upload-section">
                        <h3 className="section-title">
                            <FiUpload className="section-icon" /> Загрузить новое изображение
                        </h3>
                        <div className="file-input-wrapper">
                            <label htmlFor="image" className="file-input-label">
                                <FiUpload className="file-input-icon" />
                                <span className="file-input-text">
                                    {selectedFile ? selectedFile.name : 'Выберите файл'}
                                </span>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    accept="image/*"
                                />
                            </label>
                            <button
                                onClick={handleUploadImage}
                                className="upload-button"
                                disabled={!selectedFile || isLoading}
                            >
                                <FiUpload className="upload-button-icon" />
                                {isLoading ? 'Загрузка...' : 'Загрузить'}
                            </button>
                        </div>
                        <p className="file-hint">Поддерживаемые форматы: JPG, PNG, GIF. Макс. размер: 5MB</p>
                    </div>

                    <div className="link-section">
                        <h3 className="section-title">
                            <FiLink className="section-icon" /> Ссылка кнопки
                        </h3>
                        <div className="link-input-wrapper">
                            <input
                                type="text"
                                value={buttonLink}
                                onChange={(e) => setButtonLink(e.target.value)}
                                className="link-input"
                                placeholder="Введите ссылку"
                            />
                            <button
                                onClick={updateButtonLink}
                                className="update-button"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : 'Сохранить'}
                            </button>
                        </div>
                    </div>

                    <div className="toggle-section">
                        <h3 className="section-title">
                            {isAdActive ? (
                                <FiToggleRight className="section-icon active" />
                            ) : (
                                <FiToggleLeft className="section-icon" />
                            )} Статус рекламы
                        </h3>
                        <div className="toggle-wrapper">
                            <span className="toggle-label">
                                {isAdActive ? 'Реклама активна' : 'Реклама неактивна'}
                            </span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isAdActive}
                                    onChange={toggleAd}
                                    disabled={isLoading}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default EditAd;
