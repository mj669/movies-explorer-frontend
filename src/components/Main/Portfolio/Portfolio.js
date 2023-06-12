import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/potfolio-arrow.svg"

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__links">
                    <a className="portfolio__link" href="https://github.com/mj669/how-to-learn" target="_blank" rel="noreferrer">
                        Статичный сайт
                        <img className="portfolio__link-arrow" src={arrow} alt="Стрелка"/>
                    </a>
                </li>
                <li className="portfolio__links">
                    <a className="portfolio__link" href="https://github.com/mj669/russian-travel" target="_blank" rel="noreferrer">
                        Адаптивный сайт
                        <img className="portfolio__link-arrow" src={arrow} alt="Стрелка"/>
                    </a>
                </li>
                <li className="portfolio__links">
                    <a className="portfolio__link" href="https://github.com/mj669/mesto" target="_blank" rel="noreferrer">
                        Одностраничное приложение
                        <img className="portfolio__link-arrow" src={arrow} alt="Стрелка"/>
                    </a>
                </li>

            </ul>
        </section>
    );
}

export default Portfolio;