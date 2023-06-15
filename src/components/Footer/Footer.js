import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__title">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                </p>
                <div className="footer__info">
                    <p className="footer__copyright">© 2023</p>
                    <ul className="footer__links">
                        <li>
                            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer"
                            >
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li>
                            <a className="footer__link" href="https://github.com/mj669" target="_blank" rel="noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;