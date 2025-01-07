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
        return cleanedText.slice(0, maxLength) + '... <a href="/press-center"><strong>Читать далее</strong></a>';
    };

    renderSwiper = (posts) => {
        // const hasEnoughSlides = posts.length > 1;

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
                // loop={hasEnoughSlides} // Включаем режим цикла только если достаточно слайдов
            >
                {posts.map(post => (
                    <SwiperSlide key={post.id}>
                        <div className="content-news">
                            <img src={post.photoUrls[0]} alt="" style={{ margin: '10px 0' }} />
                            <div>
                               <p dangerouslySetInnerHTML={{ __html: this.truncateText(post.text, 190) }}></p>
                            </div>
                        </div>
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
            <div className="news-and-victory">
                <div className="news_button">
                    <div>
                        <button
                            className={`button-club ${this.state.activeButton === 'club' ? 'active' : ''}`}
                            onClick={() => this.handleButtonClick('club')}
                        >
                            НОВОСТИ АКАДЕМИИ
                        </button>
                    </div>
                    <div>
                        <button
                            className={`button-victory ${this.state.activeButton === 'victory' ? 'active' : ''}`}
                            onClick={() => this.handleButtonClick('victory')}
                        >
                            НАШИ ПОБЕДЫ
                        </button>
                    </div>
                </div>
                <div className="content">
                    {this.state.activeButton === 'club' && (
                        <div className="container-news">
                            {this.renderSwiper(filteredPosts)}
                        </div>
                    )}
                    {this.state.activeButton === 'victory' && (
                        <div className="container-victory">
                            {this.renderSwiper(victoryPosts)}
                        </div>
                    )}
                    <div className="button-all">
                        <Link to="/press-center">
                            <div className="button-style">
                                <p>Посмотреть все</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsBlock;
