import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Validator from '../../utils/Validator';
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { validateEmail } from '../../utils/validateEmail';

function Login({ onLogin, loggedIn, isLoading, errorMessage }) {

    const { values, handleOnChange, errors, isValid } = Validator();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/movies');
        }
    }, [loggedIn, navigate]);

    const handleLogin = (evt) => {
        evt.preventDefault();
        onLogin(values);
    }

    return (
        <div className="login register">
            <Link to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header" /></Link>
            <h2 className="register__title">Рады видеть!</h2>
            <Form
                buttonText={isLoading ? "Проверка данных..." : "Войти"}
                text="Еще не зарегистрированы?"
                url="/signup"
                linkText="Регистрация"
                onSubmit={handleLogin}
                isValid={isValid}
                values={values}
                isLoading={isLoading}
                errorMsg={errorMessage}
            >
                <Input
                    id="user-email"
                    type="email"
                    name="email"
                    inputTitle="E-mail"
                    minLength="7"
                    maxLength="200"
                    onChange={handleOnChange}
                    value={values.email || ''}
                    isValid={isValid}
                    errorText={validateEmail(values.email).message}
                    autoComplete="off"
                    required
                />
                <Input
                    id="user-password"
                    type="password"
                    name="password"
                    inputTitle="Пароль"
                    minLength="8"
                    maxLength="200"
                    onChange={handleOnChange}
                    value={values.password || ''}
                    isValid={isValid}
                    errorText={errors.password}
                    required
                />
            </Form>
        </div>
    );
}

export default Login;