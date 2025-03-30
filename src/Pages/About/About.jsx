import React from "react";
import { Helmet } from "react-helmet";
import "./about.css";
import Header from "../../Components/Header";
import photo_founder from "../../img/founder.jpg";
import coach from "../../img/head-coach.jpg";
import Footer from "../../Components/Footer/Footer";

// Импорт иконок
import { FaTrophy, FaGraduationCap, FaUserTie, FaFistRaised, FaFireAlt } from "react-icons/fa";
import { GiBlackBelt, GiPistolGun, GiBoxingGlove, GiMedal } from "react-icons/gi";
import { MdSportsMma, MdOutlineSelfImprovement, MdFitnessCenter } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
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