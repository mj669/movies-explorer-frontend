import React, { useState, useEffect } from 'react';
import './Movies.css';
import Search from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import { SHORTS_MOVIES_DURATION } from '../../utils/constants';

const Movies = ({ movies, savedMovies, onLikeMovie }) => {

    const searchedMovies = localStorage.getItem('searchedMovies');
    const queries = localStorage.getItem('searchQueryMovies');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        }
    }, [searchedMovies]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        }
    }, [queries]);

    const filterMovies = (query) => {
        if (!filteredMovies.length) {
            setIsLoading(true);
        }
        setTimeout(
            () => {
                let filtered = [];
                localStorage.setItem('searchQueryMovies', JSON.stringify(query));
                if (query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return (
                            m.duration <= SHORTS_MOVIES_DURATION &&
                            m.nameRU
                                .toLowerCase()
                                .trim()
                                .includes(query.searchText.toLowerCase())
                        );
                    });
                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                } else if (!query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return m.nameRU
                            .toLowerCase()
                            .trim()
                            .includes(query.searchText.toLowerCase());
                    });
                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                }
                setIsLoading(false);
            },
            filteredMovies.length ? 0 : 1000
        );
    };

    const handleResetInput = () => {
        setFilteredMovies([]);
        setSearchQuery({});
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('searchQueryMovies');
    };

    return (
        <section className="movies">
            <div className="movies__search-wrap">
                <Search
                    onFilter={filterMovies}
                    searchQuery={searchQuery}
                    onResetInput={handleResetInput}
                />
            </div>
            {isLoading ? (
                <Preloader />
            ) : filteredMovies.length ? (
                <MoviesCardList
                    movies={filteredMovies}
                    savedMovies={savedMovies}
                    onLikeMovie={onLikeMovie}
                />
            ) : (
                searchedMovies && (
                    <p className="movies__error">Ничего не найдено</p>
                )
            )}
        </section>
    );
}
export default Movies;