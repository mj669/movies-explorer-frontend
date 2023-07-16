import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {

    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedSavedMovies');
    const queries = localStorage.getItem('searchQuerySavedMovies');
    const [searchQuery, setSearchQuery] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        } else {
            setFilteredMovies(savedMovies);
        }
    }, [searchedMovies, savedMovies, searchQuery]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        } else {
            setSearchQuery({ ...queries, searchText: '' });
        }
    }, [queries, savedMovies]);

    const filterMovies = (query) => {
        if (!filteredMovies.length) {
            setIsLoading(true);
        }

        setTimeout(
            () => {
                let filtered = [];
                localStorage.setItem('searchQuerySavedMovies', JSON.stringify(query));
                if (query.isShortFilmChecked) {
                    filtered = savedMovies.filter((m) => {
                        return (
                            m.duration <= 40 &&
                            m.nameRU
                                .toLowerCase()
                                .trim()
                                .includes(query.searchText.toLowerCase())
                        );
                    });
                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
                } else if (!query.isShortFilmChecked) {
                    filtered = savedMovies.filter((m) => {
                        return m.nameRU
                            .toLowerCase()
                            .trim()
                            .includes(query.searchText.toLowerCase());
                    });
                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
                }
                setIsLoading(false);
            },
            filteredMovies.length ? 0 : 1000
        );
    };

    const handleResetInput = () => {
        setFilteredMovies(savedMovies);
        setSearchQuery({});
        localStorage.removeItem('searchedSavedMovies');
        localStorage.removeItem('searchQuerySavedMovies');
    };

    return (
        <section className="saved-movies">
            <SearchForm onFilter={filterMovies} searchQuery={searchQuery}
                onResetInput={handleResetInput} />
            {isLoading ? (
                <Preloader />
            ) : filteredMovies.length ? (
                <MoviesCardList
                    movies={filteredMovies}
                    onDeleteMovie={onDeleteMovie}
                />
            ) : (
                searchedMovies && (
                    <p className="movies__error">
                        Ничего не найдено
                    </p>
                )
            )}
        </section>
    );
};

export default SavedMovies;