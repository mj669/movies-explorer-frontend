import React, { useState } from 'react';
import './Profile.css';

function Profile() {

    const [isEditing, setIsEditing] = useState(false);

    function handleEditProfile(e) {
        e.preventDefault();
        setIsEditing(true);
    }
    return (
        <div className="profile">
            <h2 className="profile__title">Привет, Алексей!</h2>
            <form className="profile__form" name="profile-form" method="post" noValidate>
                <div className="profile__field-wrap">
                    <label className="profile__label">Имя
                    </label>
                    <input className="profile__input" name="profile-name-input" type="text" required disabled={!isEditing}
                        placeholder="Введите новое имя" minLength="2" maxLength="30" />
                </div>
                <div className="profile__field-wrap">
                    <label className="profile__label">Email
                    </label>
                    <input className="profile__input" name="profile-email-input" type="text" required disabled={!isEditing}
                        placeholder="Введите новый email" minLength="7" maxLength="200" />
                </div>
                <div className="profile__form-actions">
                    {!isEditing ? (
                        <div className="profile__form-actions-wrap">
                            <button className="profile__action-button profile__action-button_action_edit" onClick={handleEditProfile}>
                                Редактировать</button>
                            <button className="profile__action-button profile__action-button_action_logout">
                                Выйти из аккаунта</button>
                        </div>
                    ) : (
                        <div className="profile__form-actions-wrap">
                            <button className="profile__action-button profile__action-button_action_save">
                                Сохранить</button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Profile;