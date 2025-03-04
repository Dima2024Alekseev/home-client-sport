import React, { useEffect, useState, useRef, useCallback } from 'react';
import ContentLoader from './Skeleton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination/Pagination';
import Modal from './Modal Window/Modal';

const Posts = ({ filterTag }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const mainRef = useRef(null);

    const removeLinksFromText = (text) => {
        if (!text) return text;
        return text.replace(/\[club\d+\|([^\]]+)\]/g, '$1').replace(/\[id\d+\|([^\]]+)\]/g, '$1');
    };

    const fetchPosts = useCallback(() => {
        setLoading(true);
        axios.get('/api/posts')
            .then(response => {
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
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [filterTag]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (posts.length > itemsPerPage) {
            setCurrentPage(1);
        }
    }, [posts, itemsPerPage]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
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
                    <h2>Произошла ошибка</h2>
                    <p>Пожалуйста, попробуйте снова или перейдите на главную страницу.</p>
                    <div className='position-error-button'>
                        <button onClick={handleGoHome} aria-label="Go to Home">На главную</button>
                        <button onClick={handleReload} aria-label="Reload Page">Попробовать снова</button>
                    </div>
                </section>
            ) : (
                <>
                    <main ref={mainRef}>
                        {currentItems.map(post => (
                            <article className='news' key={post.id}>
                                <div className='news-text-container'>
                                    <h2 className='news-title'>{post.title}</h2>
                                    <pre className='news-text'>{post.text}</pre>
                                </div>
                                {post.photoUrls && (
                                    <figure className='news-image-container'>
                                        <img
                                            src={post.photoUrls[0]}
                                            alt={`Image for post ${post.id}`}
                                            onClick={() => openModal(post.photoUrls[0])}
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
