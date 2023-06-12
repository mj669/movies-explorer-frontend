import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Logo from '../../images/logo.svg';
import AccountLogo from '../../images/account-logo.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ loggedIn }) {

    let location = useLocation();

    return (
        <>
            <header className={`header ${location.pathname === "/" ? 'header__theme_blue' : ''}`}>
                <Link className="header__logo" to="/">
                    <img src={Logo} alt="logo" />
                </Link>
                {loggedIn ? (
                    <div className="header__wrap">
                        <div className="header__movies-wrap">
                            <Link
                                className={`header__movies${location.pathname === '/movies'
                                    ? ' header__movies-route_active'
                                    : ''
                                    }`}
                                to="/movies"
                            >
                                Фильмы
                            </Link>
                            <Link
                                className={`header__movies${location.pathname === '/saved-movies'
                                    ? ' header__movies-route_active'
                                    : ''
                                    }`}
                                to="/saved-movies"
                            >
                                Сохраненные фильмы
                            </Link>
                        </div>
                        <Link className="header__route header__route-account" to="/profile">
                            <img src={AccountLogo} alt="Лого аккаунта" /> Аккаунт
                        </Link>
                    </div>
                ) : (
                    <div className="header__wrap">
                        <Link className="header__signup " to="/signup">
                            Регистрация
                        </Link>
                        <Link className="header__signin" to="/signin">
                            Войти
                        </Link>
                    </div>
                )}
                <BurgerMenu />
            </header>
        </>
    );
}

export default Header;
