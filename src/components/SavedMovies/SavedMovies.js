import React from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import { moviesList } from '../../utils/movies';

const SavedMovies = () => {
    return (
        <section className="saved-movies">
            <SearchForm />
            <FilterCheckbox checkboxName={'Короткометражки'} />
            <MoviesCardList movies={moviesList} />
        </section>
    );
};

export default SavedMovies;