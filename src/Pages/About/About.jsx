import React from "react";
import "./about.css";
import Header from "../../Components/Header";
import photo_founder from "../../img/founder.jpg";
import coach from "../../img/head-coach.jpg";
import Footer from "../../Components/Footer/Footer";

const About = () => {
    return (
        <>
            <Header
                title="об Академии"
                showBlock={true}
                innerTitle="об Академии"
                linkText="об Академии"
                showGradient={true}
            />
            <main className="content_about_us">
                <section>
                    <div className="position-title-photo">
                        <img src={photo_founder} alt="Фото основателя" />
                        <div>
                            <h2>Бычков Сергей Валерьевич</h2>
                            <h3>Главный тренер и основатель Академии боевых единоборств "Хулиган"</h3>
                            <p>
                                Окончил Красноярский техникум физической культуры в 1994-1999 годах.<br />
                                Инструктор по карате-до Шотокан с 1989 года.<br />
                                Инструктор по прикладному рукопашному бою, огневой подготовке и выживанию с 1998 года.<br />
                                Президент Канской Федерации ММА с 2012 года.<br />
                                Инструктор по спортивному контактному карате с 2015 года.<br />
                                Чёрный пояс по Окинавскому карате Кобудо с 2016 года.<br />
                                Инструктор по фитнесу с 2018 года.<br />
                                Чёрный пояс по Корейскому боевому искусству Хапкидо с 2021 года.<br />
                                Инструктор по боевой растяжке с 2022 года.
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="position-title-photo">
                        <img src={coach} alt="Фото главного тренера" />
                        <div>
                            <h2>Бычков Антон Сергеевич</h2>
                            <h3>Тренер</h3>
                            <p>
                                Окончил Канский педагогический колледж по специальности «Физическая культура» с отличием.<br />
                                Инструктор по боевой растяжке.<br />
                                Рекорд в проф ММА 1-1.<br />
                                Победитель турнира Koshiki Combat Championship PRO 3.<br />
                                Победитель кубка Азии по косики каратэ.<br />
                                Призер чемпионата Сибири по ММА.<br />
                                Призер первенства России по рукопашному бою.<br />
                                Финалист первенства России по косики каратэ.<br />
                                Финалист первенства России по боксу.<br />
                                Тренерский стаж с 2018 года.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
