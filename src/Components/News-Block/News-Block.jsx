import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './news-slider.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

class NewsBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 'club'
        };
    }

    handleButtonClick = (button) => {
        this.setState({ activeButton: button });
    };

    truncateText = (text, maxLength) => {
        // Remove the hashtag #наши победы
        const cleanedText = text.replace(/#нашипобеды|#афиша/g, '').trim();

        if (cleanedText.length <= maxLength) {
            return cleanedText;
        }
        return `${cleanedText.slice(0, maxLength)}... <a href="/press-center"><strong>Читать далее</strong></a>`;
    };

    renderSwiper = (posts) => {
        return (
            <Swiper
                spaceBetween={30}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2
                    }
                }}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {posts.map(post => (
                    <SwiperSlide key={post.id}>
                        <article className="content-news">
                            <img src={post.photoUrls[0]} alt={post.title} style={{ margin: '10px 0' }} />
                            <div>
                                <p dangerouslySetInnerHTML={{ __html: this.truncateText(post.text, 190) }}></p>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    render() {
        const { posts } = this.props;

        // Фильтрация постов
        const filteredPosts = posts.filter(post =>
            post.photoUrls &&
            post.photoUrls.length > 0
        );

        // Фильтрация постов по хэштегу #наши победы
        const victoryPosts = filteredPosts.filter(post =>
            post.text && post.text.includes('#нашипобеды')
        );

        return (
            <section className="news-and-victory">
                <nav className="news_button">
                    <button
                        className={`button-club ${this.state.activeButton === 'club' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('club')}
                        aria-pressed={this.state.activeButton === 'club'}
                    >
                        НОВОСТИ АКАДЕМИИ
                    </button>
                    <button
                        className={`button-victory ${this.state.activeButton === 'victory' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('victory')}
                        aria-pressed={this.state.activeButton === 'victory'}
                    >
                        НАШИ ПОБЕДЫ
                    </button>
                </nav>
                <div className="content">
                    {this.state.activeButton === 'club' && (
                        <section className="container-news">
                            {this.renderSwiper(filteredPosts)}
                        </section>
                    )}
                    {this.state.activeButton === 'victory' && (
                        <section className="container-victory">
                            {this.renderSwiper(victoryPosts)}
                        </section>
                    )}
                    <div className="button-all">
                        <Link to="/press-center" className="button-style">
                            <p>Посмотреть все</p>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default NewsBlock;
