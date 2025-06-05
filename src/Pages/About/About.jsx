import React from "react";
import { Helmet } from "react-helmet";
import "./about.css";
import Header from "../../Components/Header";
import photo_founder from "../../img/founder.jpg";
import coach from "../../img/head-coach.jpg";
import Footer from "../../Components/Footer/Footer";

// Импорт иконок
import { FaGraduationCap, FaUserTie, FaFistRaised, FaQuoteLeft } from "react-icons/fa";
import { GiBlackBelt, GiPistolGun, GiBoxingGlove, GiMedal } from "react-icons/gi";
import { MdSportsMma, MdOutlineSelfImprovement, MdFitnessCenter } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { MdSportsKabaddi } from "react-icons/md";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

const About = () => {
    return (
        <>
            <Helmet>
                <title>Об Академии боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о основателе и тренерах Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Академия боевых единоборств, Хулиган, Сергей Бычков, Антон Бычков, ММА, карате, рукопашный бой" />
            </Helmet>
            <Header
                title="Об Академии"
                showBlock={true}
                innerTitle="Об Академии"
                linkText="Об Академии"
                showGradient={true}
            />
            <main className="content_about_us">
                <section className="philosophy-section">
                    <div className="philosophy-container">
                        <div className="philosophy-header">
                            <h2>Философия "Хулиган"</h2>
                            <div className="divider"></div>
                            <p className="philosophy-subtitle">Наш подход к боевым искусствам — это не спорт, а образ мышления</p>
                        </div>
                        <div className="philosophy-content">
                            <div className="philosophy-block">
                                <div className="philosophy-icon">
                                    <MdSportsMma />
                                </div>
                                <div className="philosophy-text">
                                    <h3>Почему «Хулиган»?</h3>
                                    <p>Наша философия отличается от традиционного спортивного подхода. Мы не ставим во главу угла победу в соревнованиях — ведь её определяют судьи. Наша главная цель — сделать так, чтобы противник не мог продолжать бой (нокаут, сабмишн), и добиваться досрочной победы любым допустимым способом.</p>

                                    <div className="quote-block">
                                        <FaQuoteLeft className="quote-icon" />
                                        <blockquote>
                                            Так и родилось название «Хулиган» — тот, кто гнёт свою линию и не признаёт навязанных ограничений.
                                        </blockquote>
                                    </div>

                                    <p>Из-за такой установки наши бойцы порой действуют слишком агрессивно и выходят за рамки правил. Со временем мы вовсе перестали ориентироваться на чужие стандарты — ведь если постоянно подстраиваться под чужие правила, невозможно выработать свой стиль.</p>
                                </div>
                            </div>
                            <div className="philosophy-block">
                                <div className="philosophy-icon">
                                    <MdSportsKabaddi />
                                </div>
                                <div className="philosophy-text">
                                    <h3>Не спортсмены, а бойцы</h3>
                                    <p>С самого начала мы не называем наших воспитанников «спортсменами» — этот термин подразумевает погоню за результатами в рамках одного вида спорта. У нас растут бойцы, которых постепенно готовят к реальным условиям: сокращая защиту, увеличивая нагрузку и приучая к жёсткому сопротивлению.</p>

                                    <div className="quote-block highlight-quote">
                                        <FaQuoteLeft className="quote-icon" />
                                        <blockquote>
                                            Главное для нас — не медаль, а уверенность тренера в том, что боец сделал всё возможное. Победа в турнире — лишь приятный бонус, но не самоцель.
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-section">
                    <div className="position-title-photo">
                        <div className="photo-container">
                            <img src={photo_founder} alt="Фото основателя Бычкова Сергея Валерьевича" />
                            <div className="badge">Основатель</div>
                        </div>
                        <div className="info-container">
                            <h2>Бычков Сергей Валерьевич</h2>
                            <h3>Главный тренер и основатель Академии боевых единоборств "Хулиган"</h3>
                            <div className="divider"></div>
                            <ul className="achievements-list">
                                <li><span><FaGraduationCap /></span> Окончил Красноярский техникум физической культуры в 1994-1999 годах</li>
                                <li><span><GiBlackBelt /></span> Инструктор по карате-до Шотокан с 1989 года</li>
                                <li><span><GiPistolGun /></span> Инструктор по прикладному рукопашному бою, огневой подготовке и выживанию с 1998 года</li>
                                <li><span><MdSportsMma /></span> Президент Канской Федерации ММА с 2012 года</li>
                                <li><span><FaFistRaised /></span> Инструктор по спортивному контактному карате с 2015 года</li>
                                <li><span><GiBlackBelt /></span> Чёрный пояс по Окинавскому карате Кобудо с 2016 года</li>
                                <li><span><MdFitnessCenter /></span> Инструктор по фитнесу с 2018 года</li>
                                <li><span><GiBlackBelt /></span> Чёрный пояс по Корейскому боевому искусству Хапкидо с 2021 года</li>
                                <li><span><MdOutlineSelfImprovement /></span> Инструктор по боевой растяжке с 2022 года</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="position-title-photo reverse">
                        <div className="photo-container">
                            <img src={coach} alt="Фото главного тренера Бычкова Антона Сергеевича" />
                            <div className="badge">Тренер</div>
                        </div>
                        <div className="info-container">
                            <h2>Бычков Антон Сергеевич</h2>
                            <h3>Тренер Академии боевых единоборств "Хулиган"</h3>
                            <div className="divider"></div>
                            <ul className="achievements-list">
                                <li><span><FaGraduationCap /></span> Окончил Канский педагогический колледж по специальности «Физическая культура» с отличием</li>
                                <li><span><MdOutlineSelfImprovement /></span> Инструктор по боевой растяжке</li>
                                <li><span><MdSportsMma /></span> Рекорд в проф ММА 1-1</li>
                                <li><span><AiOutlineTrophy /></span> Победитель турнира Koshiki Combat Championship PRO 3</li>
                                <li><span><BsGlobe /></span> Победитель кубка Азии по косики каратэ</li>
                                <li><span><RiMedalLine /></span> Призер чемпионата Сибири по ММА</li>
                                <li><span><GiMedal /></span> Призер первенства России по рукопашному бою</li>
                                <li><span><RiMedalLine /></span> Финалист первенства России по косики каратэ</li>
                                <li><span><GiBoxingGlove /></span> Финалист первенства России по боксу</li>
                                <li><span><FaUserTie /></span> Тренерский стаж с 2018 года</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;