import React, { useState } from "react";
import "./BurgerMenu.css";
import accountLogo from "../../images/account-logo.svg"
import burgermenuLogo from "../../images/burger-menu.svg";
import burgermenuButtonClose from "../../images/burger-menu-close.svg";
import { Link } from "react-router-dom";

function BurgerMenu() {

    const [menuIsActive, setMenuIsActive] = useState(false)

    return (
        <div className="burgermenu">
            {!menuIsActive &&
                <div className="burgermenu__disactive">
                    <button className="burgermenu__button" onClick={() => setMenuIsActive(prev => setMenuIsActive(!prev))}>
                        <img src={burgermenuLogo} alt="бургер-меню лого" />
                    </button>
                </div>
            }
            {menuIsActive &&
                <div className="burgermenu__wrap">
                    <div className="burgermenu__active">
                        <button className="burgermenu__close" onClick={() => setMenuIsActive(prev => setMenuIsActive(!prev))}>
                            <img src={burgermenuButtonClose} alt="бургер-меню крест" />
                        </button>
                        <nav className="burgermenu__links">
                            <Link className="burgermenu__link" to="/">Главная</Link>
                            <Link className="burgermenu__link burgermenu__link_active" to="/movies">Фильмы</Link>
                            <Link className="burgermenu__link" to="/saved-movies">Сохранённые фильмы</Link>
                        </nav>
                        <nav className='burgermenu__footer'>
                            <div className="burgermenu__footer-button">
                                <Link to="/profile">
                                    <img src={accountLogo} alt="Логотип аккаунта" className="burgermenu__account" />
                                </Link>
                                <Link className="burgermenu__login" to="/profile">Аккаунт</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            }
        </div>
    );
}

export default BurgerMenu;