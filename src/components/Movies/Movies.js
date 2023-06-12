import React from 'react';
import './Movies.css';
import Search from './SearchForm/SearchForm';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { moviesList } from '../../utils/movies';

function Movies() {
    return (
        <section className="movies">
            <div className="movies__search-wrap">
                <Search />
            </div>
            <FilterCheckbox checkboxName={'Короткометражки'} />
            <MoviesCardList movies={moviesList} />
            <button className="movies__add-btn">Ещё</button>
        </section>
    );
}
export default Movies;