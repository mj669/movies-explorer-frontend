import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';

function Search({ onFilter, searchQuery, onResetInput }) {

    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
    const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);

    useEffect(() => {
        if (searchQuery.searchText) {
            setSearchText(searchQuery.searchText);
        }
    }, [searchQuery.searchText]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const checkFilterBox = () => {
        if (searchText !== '') {
            setIsShortFilmChecked(!isShortFilmChecked);
            // localStorage.setItem('filterCheckBox', !isShortFilmChecked);

            onFilter({
                searchText: searchText,
                isShortFilmChecked: !isShortFilmChecked
            });
        } else {
            setIsShortFilmChecked(!isShortFilmChecked);
            // localStorage.setItem('filterCheckBox', !isShortFilmChecked);

            onFilter({
                searchText: searchQuery.searchText,
                isShortFilmChecked: !isShortFilmChecked
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchText) {
            setError('Нужно ввести ключевое слово');
            return;
        } else {
            onFilter({ searchText, isShortFilmChecked });
        }
    };

    return (
        <form
            className="search"
            name="search"
            onSubmit={handleSubmit}
        >
            <div className="search__input-field">
                <input
                    className="search__input"
                    name="search"
                    type="search"
                    value={searchText || ''}
                    placeholder="Фильм"
                    min="1"
                    onChange={handleChange}
                />
                <span className={`search__input-error`}>{!searchText && error}</span>
            </div>
            <button className="search__input-button" type='submit'  >Поиск</button>
            <FilterCheckbox
                isChecked={searchQuery.isShortFilmChecked}
                onCheck={checkFilterBox}
            />
        </form>
    );
}

export default Search;