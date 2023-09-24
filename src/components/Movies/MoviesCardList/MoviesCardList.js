import React, { useState, useEffect, useMemo } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import useResize from '../../../utils/use-resize';
import { SCREEN_MD, SCREEN_XL, MOVIES_CARDS_1280, MOVIES_CARDS_768, MOVIES_CARDS_480, ADD_MOVIES_CARD_1280, ADD_MOVIES_CARD_768 } from '../../../utils/constants';

function MoviesCardList({ movies, savedMovies, onLikeMovie, onDeleteMovie }) {

    let size = useResize();
    const [moviesToAdd, setMoviesToAdd] = useState(0);
    const location = useLocation();

    useEffect(() => {
        setMoviesToAdd(0);
    }, [movies]);

    const renderMovies = useMemo(() => {
        const countToRender = size.width < SCREEN_MD ? MOVIES_CARDS_480 : size.width < SCREEN_XL ? MOVIES_CARDS_768 : MOVIES_CARDS_1280;
        return movies.slice(0, countToRender + moviesToAdd);
    }, [movies, moviesToAdd, size]);

    return (
        <>
            <ul className="movies-cardlist">
                {renderMovies.map((movie) => {
                    return (
                        <MoviesCard
                            key={movie.id || movie.movieId}
                            movie={movie}
                            savedMovies={savedMovies}
                            onLikeMovie={onLikeMovie}
                            onDeleteMovie={onDeleteMovie}
                        />
                    );
                })}
            </ul>
            {location.pathname === '/movies' &&
                movies.length > renderMovies.length && (
                    <button
                    onClick={() => { setMoviesToAdd((prev) => prev + (size.width >= SCREEN_XL ? ADD_MOVIES_CARD_1280 : ADD_MOVIES_CARD_768));}}
                        className="movies__add-btn"
                    >
                        Еще
                    </button>
                )}
        </>
    );
};

export default MoviesCardList;