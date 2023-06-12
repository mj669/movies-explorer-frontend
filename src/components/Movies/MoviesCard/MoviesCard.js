import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {

    let location = useLocation();
    const isLikeButton = location.pathname === '/movies';
    const isDeleteButton = location.pathname === '/saved-movies';

    return (
        <article className="moviescard__content" key={movie.id}>
            <img
                className="moviescard__image"
                src={movie.screen}
                alt={movie.name}
            />
            <div className="moviescard__description">
                <p className="moviescard__name">{movie.name}</p>
                <p className="moviescard__duration">{movie.time}</p>
                {isLikeButton && (
                    <button
                        className={`moviescard__like-btn ${movie.isLiked ? ' moviescard__like-btn_active' : ''
                            }`}
                    ></button>
                )}
                {isDeleteButton && (
                    <button className={`moviescard__delete-btn`}></button>
                )}
            </div>
        </article>
    );
};

export default MoviesCard;