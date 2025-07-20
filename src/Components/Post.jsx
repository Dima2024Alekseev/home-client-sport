import React, { useEffect, useState, useRef, useCallback } from 'react';
import ContentLoader from './Skeleton'; // Используем этот скелетон
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination/Pagination';
import Modal from './Modal Window/Modal';

const Posts = ({ filterTag }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Главное состояние для контроля отображения скелетона.
    // true = показываем скелетон, false = показываем контент.
    const [showContentSkeleton, setShowContentSkeleton] = useState(true);

    const navigate = useNavigate();
    const mainRef = useRef(null);

    // Функция для удаления VK-специфичных ссылок из текста
    const removeLinksFromText = useCallback((text) => {
        if (!text) return text;
        return text.replace(/\[club\d+\|([^\]]+)\]/g, '$1').replace(/\[id\d+\|([^\]]+)\]/g, '$1');
    }, []); // Не имеет внешних зависимостей.

    // Функция для преобразования URL в кликабельные ссылки
    const makeLinksClickable = useCallback((text) => {
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
    }, []); // Не имеет внешних зависимостей.

    // Функция для предварительной загрузки изображений
    const preloadImages = useCallback((imageUrls) => {
        if (!imageUrls || imageUrls.length === 0) {
            return Promise.resolve(); // Если нет изображений, сразу резолвим.
        }
        const promises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                // В случае ошибки загрузки изображения, всё равно считаем его "завершённым",
                // чтобы не блокировать отображение всего контента.
                img.onerror = () => {
                    console.warn(`Ошибка загрузки изображения: ${url}`);
                    resolve();
                };
            });
        });
        return Promise.all(promises);
    }, []); // Не имеет внешних зависимостей.

    // Главная функция для получения постов с бэкенда
    const fetchPosts = useCallback(async () => {
        // Всегда показываем скелетон при начале загрузки данных.
        setShowContentSkeleton(true);
        setError(null); // Сбрасываем предыдущие ошибки.

        try {
            // URL к вашему бэкенду. В продакшене лучше использовать относительный путь `/api/posts`.
            const response = await axios.get('/api/posts');
            const sortedPosts = response.data.sort((a, b) => b.id - a.id);
            const filteredPosts = sortedPosts.filter(post => {
                // Фильтрация постов: должны быть photoUrls, text, нет видео-вложений и соответствие filterTag.
                return post.photoUrls && post.photoUrls.length > 0 &&
                    post.text &&
                    (!post.attachments || !post.attachments.some(attachment => attachment.type === 'video')) &&
                    (!filterTag || post.text.includes(filterTag));
            });
            const modifiedPosts = filteredPosts.map(post => ({
                ...post,
                // Применяем обе функции обработки текста: сначала удаляем VK-ссылки, затем теги.
                text: removeLinksFromText(post.text).replace(/#нашипобеды|#афиша/g, '').trim()
            }));

            setPosts(modifiedPosts);
            // При новой загрузке данных или изменении фильтра, всегда сбрасываем страницу на первую.
            setCurrentPage(1);

            // Логика скрытия скелетона и предзагрузки изображений будет в отдельном useEffect.
        } catch (err) {
            console.error('Ошибка при получении данных:', err);
            setError(err.message);
            // При ошибке скрываем скелетон и показываем сообщение об ошибке.
            setShowContentSkeleton(false);
        }
    }, [filterTag, removeLinksFromText]); // Зависимость: `filterTag` и `removeLinksFromText`.

    // Эффект для инициализации загрузки постов при монтировании компонента или изменении filterTag.
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]); // Зависимость: `fetchPosts` (обёрнутый в useCallback).

    // Вычисляем посты для текущей страницы.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    // Эффект для управления видимостью скелетона и предзагрузки изображений на текущей странице.
    useEffect(() => {
        let minTimeTimer;
        let finalHideTimer;

        // Если посты ещё не загружены (например, при первом рендере) и нет ошибок,
        // и скелетон уже показан, то не выполняем логику скрытия.
        // Это предотвращает лишние действия, пока `fetchPosts` не завершится.
        if (posts.length === 0 && !error && showContentSkeleton) {
            return;
        }

        // При каждой смене страницы или изменении `posts`, активируем скелетон.
        setShowContentSkeleton(true);

        const imageUrls = currentItems.flatMap(post => post.photoUrls);

        // Создаём промис, который разрешится после минимальной задержки.
        const minTimePromise = new Promise(resolve => {
            // Минимальное время отображения скелетона (для плавности).
            minTimeTimer = setTimeout(resolve, 600); // Оставлено 600мс, как в вашем "рабочем" коде.
        });

        // Ждём, пока загрузятся изображения И пройдёт минимальное время.
        Promise.all([preloadImages(imageUrls), minTimePromise])
            .then(() => {
                // После выполнения обоих условий, добавляем небольшую дополнительную задержку.
                // Это даёт браузеру время на финальную отрисовку, предотвращая "прыжки".
                finalHideTimer = setTimeout(() => {
                    setShowContentSkeleton(false);
                }, 100); // Дополнительная задержка 100 мс.
            })
            .catch(err => {
                // В случае ошибки при загрузке изображений, всё равно скрываем скелетон.
                console.error("Ошибка при синхронизации загрузки/задержки:", err);
                setShowContentSkeleton(false);
            });

        // Очистка таймеров при размонтировании компонента или изменении зависимостей `useEffect`.
        return () => {
            clearTimeout(minTimeTimer);
            clearTimeout(finalHideTimer);
        };
    }, [currentPage, posts, itemsPerPage, preloadImages, error, currentItems, showContentSkeleton]); // Все необходимые зависимости.

    // Отдельный useEffect из вашего "рабочего" кода для сброса страницы, если постов меньше.
    // Его можно оставить, но он может быть интегрирован в fetchPosts, если хотите.
    useEffect(() => {
        if (posts.length > 0 && currentPage > Math.ceil(posts.length / itemsPerPage)) {
            setCurrentPage(1); // Если текущая страница вне диапазона, сбрасываем на первую.
        }
    }, [posts, itemsPerPage, currentPage]);


    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        navigate('/'); // Изменил на '/' как в вашем "рабочем" коде.
    };

    const paginate = (pageNumber) => {
        // При переключении страницы сразу показываем скелетон.
        setShowContentSkeleton(true);
        setCurrentPage(pageNumber);
        // Прокручиваем страницу к началу контента.
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setModalActive(true);
    };

    return (
        <div>
            {/* Условный рендеринг: показываем скелетон или контент/ошибку */}
            {showContentSkeleton ? (
                // Если скелетон активен, показываем его.
                <ContentLoader />
            ) : error ? (
                // Если есть ошибка, показываем сообщение об ошибке.
                <section className='error'>
                    <h2>Произошла ошибка</h2>
                    <p>Пожалуйста, попробуйте снова или перейдите на главную страницу.</p>
                    <div className='position-error-button'>
                        <button onClick={handleGoHome} aria-label="Go to Home">На главную</button>
                        <button onClick={handleReload} aria-label="Reload Page">Попробовать снова</button>
                    </div>
                </section>
            ) : (
                // Если всё загружено и нет ошибок, показываем новости.
                <>
                    <main ref={mainRef}>
                        {currentItems.map(post => (
                            <article className='news' key={post.id}>
                                <div className='news-text-container'>
                                    <h2 className='news-title'>{post.title}</h2>
                                    <pre className='news-text'>
                                        {makeLinksClickable(post.text)}
                                    </pre>
                                </div>
                                {post.photoUrls && (
                                    <figure className='news-image-container'>
                                        <img
                                            src={post.photoUrls[0]}
                                            alt={`Иллюстрация для "${post.title}"`}
                                            onClick={() => openModal(post.photoUrls[0])}
                                            // Здесь мы больше не используем `onLoad` или `opacity`,
                                            // так как видимость управляется на уровне всего блока через скелетон.
                                        />
                                    </figure>
                                )}
                            </article>
                        ))}
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