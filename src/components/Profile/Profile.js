import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Validator from '../../utils/Validator';

function Profile({ onSignOut, onUpdateUser }) {

    const { values, handleOnChange, errors, isValid, setValues, setIsValid } = Validator();

    const currentUser = useContext(CurrentUserContext);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
            setIsValid(true);
        }
    }, [currentUser, setIsValid, setValues]);

    function handleEditProfile(e) {
        e.preventDefault();
        setIsEditing(true);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser(values);
    }

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form
                onSubmit={handleSubmit}
                className="profile__form"
                name="profile-form"
                noValidate
            >
                <div className="profile__field-wrap">
                    <label className="profile__label">Имя
                    </label>
                    <input
                        className="profile__input"
                        name="name"
                        type="text"
                        disabled={!isEditing}
                        placeholder={currentUser.name || "Введите новое имя"}
                        minLength="2"
                        maxLength="30"
                        value={values.name || ''}
                        onChange={handleOnChange}
                        required
                    />
                    <span className={`input__error ${!isValid && "input__error_visible"}`}>{errors.name}</span>
                </div>
                <div className="profile__field-wrap">
                    <label className="profile__label">Email
                    </label>
                    <input
                        className="profile__input"
                        name="email"
                        type="email"
                        disabled={!isEditing}
                        placeholder={currentUser.email || "Введите новый email"}
                        minLength="7"
                        maxLength="200"
                        value={values.email || ''}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <span className={`input__error ${!isValid && "input__error_visible"}`}>{errors.email}</span>
                <div className="profile__form-actions">
                    {!isEditing ? (
                        <div className="profile__form-actions-wrap">
                            <button
                                className="profile__action-button profile__action-button_action_edit"
                                onClick={handleEditProfile}
                            >
                                Редактировать
                            </button>
                            <button
                                className="profile__action-button profile__action-button_action_logout"
                                type="button"
                                onClick={onSignOut}
                                
                            >
                                Выйти из аккаунт
                            </button>
                        </div>
                    ) : (
                        <div className="profile__form-actions-wrap">
                            <button
                                className="profile__action-button profile__action-button_action_save"
                                type="submit"
                                disabled={!isValid}
                            >
                                Сохранить
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Profile;