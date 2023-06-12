import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies }) {

    let location = useLocation();

    movies = location.pathname === '/saved-movies' ? movies.filter((m) => m.isLiked) : movies;
    return (
        <ul className="movies-cardlist">
            {movies?.map((movie) => {
                return <MoviesCard key={movie.id} movie={movie} />;
            })}
        </ul>
    );
};

export default MoviesCardList;