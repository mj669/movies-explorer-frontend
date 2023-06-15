import React from 'react';
import './NotFoudPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <section className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__subtitle">Страница не найдена</p>
            <Link to="/" className="not-found-page__button">
                Назад
            </Link>
        </section>
    );
}

export default NotFoundPage;