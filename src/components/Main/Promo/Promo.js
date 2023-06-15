import React from 'react';
import './Promo.css';
import Image from '../../../images/design-logo.svg';

const Promo = () => {
    return (
        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img className="promo__image" src={Image} alt="logo" />
        </section>
    );
};

export default Promo;
