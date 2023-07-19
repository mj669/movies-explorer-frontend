import React from 'react';
import './Form.css';
import { Link, useLocation } from "react-router-dom";

function Form({ name, buttonText, linkText, url, text, children, onSubmit, isValid, errorMsg }) {

    let location = useLocation();

    return (
        <form
            className="form"
            name={name}
            onSubmit={onSubmit}
            noValidate
        >

            {children}

            <span className={`input__error ${errorMsg && "input__error_visible"}`}>
                {errorMsg}
            </span>
            <button className={`form__button ${location.pathname === "/signin" ? 'form__button-signin' : ''}`} disabled={!isValid}>{buttonText}</button>
            <div className="form__text-wrap">
                <p className="form__text">{text}</p>
                <Link to={url} className="form__link">{linkText}</Link>
            </div>
        </form>
    );
}

export default Form;