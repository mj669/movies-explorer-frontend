import React from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import Validator from '../../utils/Validator';
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { validateName } from '../../utils/validateName';
import { validateEmail } from '../../utils/validateEmail';

function Register({ onRegister }) {

    const { values, handleOnChange, errors, isValid } = Validator();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(values);
    }

    return (
        <div className="register">
            <Link to="/"><img src={logo} alt="Лого" className="register__header" />
            </Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <Form
                buttonText="Зарегистрироваться"
                text="Уже зарегистрированы?"
                url="/signin"
                linkText="Войти"
                onSubmit={handleSubmit}
                isValid={isValid}
            >
                <Input
                    id="user-name"
                    type="text"
                    name="name"
                    inputTitle="Имя"
                    minLength="2"
                    maxLength="20"
                    errorText={validateName(values.name).message}
                    value={values.name || ''}
                    onChange={handleOnChange}
                    isValid={isValid}
                    required
                />
                <Input
                    id="user-email"
                    type="email"
                    name="email"
                    inputTitle="E-mail"
                    minLength="7"
                    maxLength="200"
                    errorText={validateEmail(values.email).message}
                    value={values.email || ''}
                    onChange={handleOnChange}
                    isValid={isValid}
                    required
                />
                <Input
                    id="user-password"
                    type="password"
                    name="password"
                    inputTitle="Пароль"
                    minLength="8"
                    maxLength="200"
                    errorText={errors.password}
                    value={values.password || ''}
                    onChange={handleOnChange}
                    isValid={isValid}
                    required
                />
            </Form>
        </div>
    );
}

export default Register;