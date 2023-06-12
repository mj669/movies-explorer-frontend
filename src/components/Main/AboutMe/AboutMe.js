import React from "react";
import "./AboutMe.css";
import Avatar from "../../../images/avatar.png";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="aboutme__title">Студент</h2>
            <div className="aboutme__content">
                <div className="aboutme__description">
                    <h3 className="aboutme__name">Алексей</h3>
                    <p className="aboutme__job">Фронтенд-разработчик, 35 лет</p>
                    <p className="aboutme__text">Я родился в Ростове на Дону, недавно переехал в город Минеральные воды. Заканчивал институт управления, бизнеса и права, факультет менеджмент. У меня есть жена и сын. Я люблю слушать музыку и гулять по горам. Практически всю сознательную жизнь проработал в сфере строительства. После переезда решил сменить профессию.
                    </p>
                    <a className="aboutme__github" href="https://github.com/mj669" target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <img className="aboutme__avatar" src={Avatar} alt="Фото студента"></img>
            </div>
            <Portfolio />
        </section>
    );
}

export default AboutMe;