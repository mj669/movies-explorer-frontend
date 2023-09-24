import { BEATFILM_URL } from "./constants";

export default class MainApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return res.text().then((text) => {
                return Promise.reject({
                    status: res.status,
                    errorText:
                        JSON.parse(text).message === 'Validation failed'
                            ? JSON.parse(text).validation.body.message
                            : JSON.parse(text).message
                });
            });
        }
    }

    getUserData() {
        return fetch(`${this._url}/users/me`,
            { headers: this._headers })
            .then((res) => this._getResponse(res));
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    email: data.email
                })
            }).then((res) => this._getResponse(res));
    }

    getSavedMovies() {
        return fetch(`${this._url}/movies`,
            { headers: this._headers })
            .then((res) => this._getResponse(res));
    }

    saveMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${BEATFILM_URL}${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            }),
            headers: this._headers
        }).then((res) => this._getResponse(res));
    }

    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => this._getResponse(res));
    }
}