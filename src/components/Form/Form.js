import React from 'react';
import './Form.css';
import { Link } from "react-router-dom";

function Form({ name, buttonText, linkText, url, text, children }) {
    return (
        <form className="form" name={name} method="post" noValidate>
            {children}
            <button className="form__button">{buttonText}</button>
            <div className="form__text-wrap">
                <p className="form__text">{text}</p>
                <Link to={url} className="form__link">{linkText}</Link>
            </div>
        </form>
    );
}

export default Form;