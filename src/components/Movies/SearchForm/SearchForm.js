import React from 'react';
import './SearchForm.css';

function Search() {
    return (
        <form className="search" name="search">
            <input className="search__input" type="search" placeholder="Фильм" />
            <button className="search__input-button" type='submit' >Поиск</button>
        </form>
    );
}

export default Search;