import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContentLoader from './Skeleton';
import Pagination from './Pagination/Pagination';
import Modal from './Modal Window/Modal';

const Posts = ({ filterTag }) => {
    // State management
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalActive, setModalActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPageChanging, setIsPageChanging] = useState(false);
    
    // Constants
    const ITEMS_PER_PAGE = 5;
    const API_ENDPOINT = '/api/posts';
    
    // Hooks
    const navigate = useNavigate();
    const mainRef = useRef(null);

    // Text processing utilities
    const processPostText = useCallback((text) => {
        if (!text) return text;
        
        // Remove VK-specific links and hashtags
        const cleanedText = text
            .replace(/\[club\d+\|([^\]]+)\]/g, '$1')
            .replace(/\[id\d+\|([^\]]+)\]/g, '$1')
            .replace(/#нашипобеды|#афиша/g, '')
            .trim();
            
        return cleanedText;
    }, []);

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
                        className="text-link"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    }, []);

    // Data fetching
    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(API_ENDPOINT);
            const filteredPosts = response.data
                .sort((a, b) => b.id - a.id)
                .filter(post => {
                    const hasValidMedia = post.photoUrls?.length > 0 &&
                        !post.attachments?.some(att => att.type === 'video');
                    
                    const matchesFilter = !filterTag || post.text.includes(filterTag);
                    
                    return hasValidMedia && post.text && matchesFilter;
                })
                .map(post => ({
                    ...post,
                    text: processPostText(post.text)
                }));
                
            setPosts(filteredPosts);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
            setError(err.message || 'Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    }, [filterTag, processPostText]);

    // Effects
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (posts.length > ITEMS_PER_PAGE) {
            setCurrentPage(1);
        }
    }, [posts]);

    // Pagination logic
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

    const handlePageChange = useCallback((pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        
        setIsPageChanging(true);
        setCurrentPage(pageNumber);
        
        // Smooth scroll to top
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        
        // Minimal loading state for better UX
        const timer = setTimeout(() => {
            setIsPageChanging(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [totalPages]);

    // Event handlers
    const handleReload = useCallback(() => {
        window.location.reload();
    }, []);

    const handleGoHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const openModal = useCallback((imageSrc) => {
        setSelectedImage(imageSrc);
        setModalActive(true);
    }, []);

    // Render helpers
    const renderErrorState = () => (
        <section className="error-state">
            <h2>Произошла ошибка</h2>
            <p>Пожалуйста, попробуйте снова или перейдите на главную страницу.</p>
            <div className="error-actions">
                <button onClick={handleGoHome} aria-label="Go to Home">
                    На главную
                </button>
                <button onClick={handleReload} aria-label="Reload Page">
                    Попробовать снова
                </button>
            </div>
        </section>
    );

    const renderPost = (post) => (
        <article className="post-card" key={post.id}>
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <div className="post-text">
                    {makeLinksClickable(post.text)}
                </div>
            </div>
            {post.photoUrls?.[0] && (
                <figure className="post-image">
                    <img
                        src={post.photoUrls[0]}
                        alt={`Illustration for "${post.title}"`}
                        onClick={() => openModal(post.photoUrls[0])}
                        loading="lazy"
                    />
                </figure>
            )}
        </article>
    );

    return (
        <div className="posts-container">
            {isLoading ? (
                <ContentLoader />
            ) : error ? (
                renderErrorState()
            ) : (
                <>
                    <main ref={mainRef}>
                        {isPageChanging ? (
                            <ContentLoader />
                        ) : (
                            currentItems.map(renderPost)
                        )}
                    </main>
                    
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
            
            <Modal 
                isOpen={modalActive}
                onClose={() => setModalActive(false)}
                imageSrc={selectedImage}
            />
        </div>
    );
};

export default React.memo(Posts);