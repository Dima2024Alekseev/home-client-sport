import React, { useEffect, useState, useRef, useCallback } from 'react';
import ContentLoader from './Skeleton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination/Pagination';
import Modal from './Modal Window/Modal';
import PostsLoader from './Skeleton';

const Posts = ({ filterTag }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const navigate = useNavigate();
    const mainRef = useRef(null);

    // Функция для удаления VK-специфичных ссылок
    const removeLinksFromText = (text) => {
        if (!text) return text;
        return text.replace(/\[club\d+\|([^\]]+)\]/g, '$1').replace(/\[id\d+\|([^\]]+)\]/g, '$1');
    };

    // Функция для преобразования URL в кликабельные ссылки
    const makeLinksClickable = (text) => {
        if (!text) return text;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0066cc', textDecoration: 'underline' }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    // Функция для форматирования Unix timestamp в читаемый формат
    const formatDate = (unixTimestamp) => {
        if (!unixTimestamp) return 'Дата не указана';
        try {
            const date = new Date(unixTimestamp * 1000); // VK API возвращает timestamp в секундах
            return new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date);
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return 'Дата не указана';
        }
    };

    // Функция для проверки загрузки изображений
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    };

    const fetchPosts = useCallback(() => {
        setLoading(true);
        axios.get('/api/posts')
            .then(async (response) => {
                const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                const filteredPosts = sortedPosts.filter(post => {
                    return post.photoUrls && post.photoUrls.length > 0 &&
                        post.text &&
                        (!post.attachments || !post.attachments.some(attachment => attachment.type === 'video')) &&
                        (!filterTag || post.text.includes(filterTag));
                });
                const modifiedPosts = filteredPosts.map(post => ({
                    ...post,
                    text: removeLinksFromText(post.text).replace(/#нашипобеды|#афиша/g, '').trim()
                }));
                setPosts(modifiedPosts);

                // Получаем изображения для текущей страницы
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentItems = modifiedPosts.slice(indexOfFirstItem, indexOfLastItem);
                const imagePromises = currentItems
                    .filter(post => post.photoUrls && post.photoUrls[0])
                    .map(post => loadImage(post.photoUrls[0]));

                // Ждем, пока все изображения загрузятся
                await Promise.all(imagePromises);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [filterTag, currentPage, itemsPerPage]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setIsPageLoading(true);
        setCurrentPage(pageNumber);
        mainRef.current.scrollIntoView({ behavior: 'smooth' });

        // Загружаем изображения для новой страницы
        const newItems = posts.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);
        const imagePromises = newItems
            .filter(post => post.photoUrls && post.photoUrls[0])
            .map(post => loadImage(post.photoUrls[0]));

        Promise.all(imagePromises).then(() => {
            setIsPageLoading(false);
        }).catch(() => {
            setIsPageLoading(false);
        });
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalActive(true);
    };

    return (
        <div>
            {loading ? (
                <ContentLoader />
            ) : error ? (
                <section className='error'>
                    <div className="error-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2>Произошла ошибка</h2>
                    <p className="error-description">К сожалению, при загрузке данных произошла непредвиденная ошибка.</p>
                    <div className='error-actions'>
                        <button className="error-button primary" onClick={handleReload} aria-label="Reload Page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M22 11.5a10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10 10 10 0 0 1 10 10z"></path>
                            </svg>
                            Попробовать снова
                        </button>
                        <button className="error-button secondary" onClick={handleGoHome} aria-label="Go to Home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            На главную
                        </button>
                    </div>
                </section>
            ) : (
                <>
                    <main ref={mainRef}>
                        {isPageLoading ? (
                            <PostsLoader />
                        ) : (
                            currentItems.map(post => (
                                <article className='news' key={post.id}>
                                    <div className='news-text-container'>
                                        <h2 className='news-title'>{post.title}</h2>
                                        <pre className='news-text'>
                                            {makeLinksClickable(post.text)}
                                            <p className='news-date'>{formatDate(post.date)}</p>
                                        </pre>
                                    </div>
                                    {post.photoUrls && (
                                        <figure className='news-image-container'>
                                            <img
                                                src={post.photoUrls[0]}
                                                alt={`Illustration for "${post.title}"`}
                                                onClick={() => openModal(post.photoUrls[0])}
                                            />
                                        </figure>
                                    )}
                                </article>
                            ))
                        )}
                    </main>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={posts.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    <Modal active={modalActive} setActive={setModalActive} imageSrc={selectedImage} />
                </>
            )}
        </div>
    );
};

export default Posts;