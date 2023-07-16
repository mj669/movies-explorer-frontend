import React from 'react';
import './MoviesCard.css';
import { getHoursAndMinutes } from '../../../utils/convertTime';
import { useLocation } from 'react-router-dom';
import { BEATFILM_URL } from '../../../utils/constants';

function MoviesCard({ movie, savedMovies, onLikeMovie, onDeleteMovie }) {

    let location = useLocation();
    const isLikeButton = location.pathname === '/movies';
    const savedMovie = savedMovies
        ? savedMovies.find((item) => item.movieId === movie.id)
        : '';
    const isDeleteButton = location.pathname === '/saved-movies';
    const imageUrl = movie.image.url
        ? `${BEATFILM_URL}${movie.image.url}`
        : movie.image;

    const isLiked = savedMovies
        ? savedMovies.some((i) => i.movieId === movie.id)
        : false;

    return (
        <article className="moviescard">
            <a
                className="moviescard__image-wrap"
                href={movie.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="moviescard__image"
                    src={imageUrl}
                    alt={movie.nameRU}
                />
            </a>
            <div className="moviescard__description">
                <p className="moviescard__name">{movie.nameRU}</p>
                <p className="moviescard__duration">{getHoursAndMinutes(movie.duration)}</p>
                {isLikeButton && (
                    <button
                        onClick={() => onLikeMovie(movie, isLiked, savedMovie?._id)}
                        className={`moviescard__like-btn ${isLiked ? ' moviescard__like-btn_active' : ''
                            }`}
                    ></button>
                )}
                {isDeleteButton && (
                    <button
                        className={`moviescard__delete-btn`}
                        onClick={() => onDeleteMovie(movie._id)}
                    ></button>
                )}
            </div>
        </article>
    );
};

export default MoviesCard;