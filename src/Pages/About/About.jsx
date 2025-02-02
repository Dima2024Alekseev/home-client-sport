import React from "react";
import { Helmet } from "react-helmet";
import "./about.css";
import Header from "../../Components/Header";
import photo_founder from "../../img/founder.jpg";
import coach from "../../img/head-coach.jpg";
import Footer from "../../Components/Footer/Footer";

const About = () => {
    return (
        <>
            <Helmet>
                <title>Об Академии боевых единоборств "Хулиган"</title>
                <meta name="description" content="Узнайте больше о основателе и тренерах Академии боевых единоборств 'Хулиган'." />
                <meta name="keywords" content="Академия боевых единоборств, Хулиган, Сергей Бычков, Антон Бычков, ММА, карате, рукопашный бой" />
                <link rel="canonical" href="https://hooliganmma.ru/about" />
            </Helmet>
            <Header
                homeRoute="/"
                showBlock={true}
                innerTitle="Об Академии"
                linkText="Об Академии"
                showGradient={true}
            />
            <main className="content_about_us">
                <section>
                    <div className="position-title-photo">
                        <img src={photo_founder} alt="Фото основателя Бычкова Сергея Валерьевича" />
                        <div>
                            <h2>Бычков Сергей Валерьевич</h2>
                            <h3>Главный тренер и основатель Академии боевых единоборств "Хулиган"</h3>
                            <p>Окончил Красноярский техникум физической культуры в 1994-1999 годах.</p>
                            <p>Инструктор по карате-до Шотокан с 1989 года.</p>
                            <p>Инструктор по прикладному рукопашному бою, огневой подготовке и выживанию с 1998 года.</p>
                            <p>Президент Канской Федерации ММА с 2012 года.</p>
                            <p>Инструктор по спортивному контактному карате с 2015 года.</p>
                            <p>Чёрный пояс по Окинавскому карате Кобудо с 2016 года.</p>
                            <p>Инструктор по фитнесу с 2018 года.</p>
                            <p>Чёрный пояс по Корейскому боевому искусству Хапкидо с 2021 года.</p>
                            <p>Инструктор по боевой растяжке с 2022 года.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="position-title-photo">
                        <img src={coach} alt="Фото главного тренера Бычкова Антона Сергеевича" />
                        <div>
                            <h2>Бычков Антон Сергеевич</h2>
                            <h3>Тренер</h3>
                            <p>Окончил Канский педагогический колледж по специальности «Физическая культура» с отличием.</p>
                            <p>Инструктор по боевой растяжке.</p>
                            <p>Рекорд в проф ММА 1-1.</p>
                            <p>Победитель турнира Koshiki Combat Championship PRO 3.</p>
                            <p>Победитель кубка Азии по косики каратэ.</p>
                            <p>Призер чемпионата Сибири по ММА.</p>
                            <p>Призер первенства России по рукопашному бою.</p>
                            <p>Финалист первенства России по косики каратэ.</p>
                            <p>Финалист первенства России по боксу.</p>
                            <p>Тренерский стаж с 2018 года.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
