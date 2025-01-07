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

    const fetchPosts = useCallback(() => {
        setLoading(true);
        axios.get('http://localhost:5000/api/posts')
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
                    text: post.text.replace(/#нашипобеды|#афиша/g, '').trim()
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
    }, [fetchPosts, currentPage]);

    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        navigate('/home');
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
                <div className='error'>
                    <h2>Произошла ошибка</h2>
                    <p>Пожалуйста, попробуйте снова или перейдите на главную страницу.</p>
                    <div className='position-error-button'>
                        <button onClick={handleGoHome}>На главную</button>
                        <button onClick={handleReload}>Попробовать снова</button>
                    </div>
                </div>

            ) : (
                <>
                    <main ref={mainRef}>
                        {currentItems.map(post => (
                            <div className='news' key={post.id}>
                                <div className='news-text-container'>
                                    <pre className='news-text'>{post.text}</pre>
                                </div>
                                {post.photoUrls && (
                                    <div className='news-image-container'>
                                        <img
                                            src={post.photoUrls[0]}
                                            alt=''
                                            onClick={() => openModal(post.photoUrls[0])}
                                        />
                                    </div>
                                )}
                            </div>
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
