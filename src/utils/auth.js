class Auth {
    constructor({ url }) {
        this._url = url;
    }

    getResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        return res.text().then((text) => {
            return Promise.reject({
                status: res.status,
                errorText:
                    JSON.parse(text).message === 'Validation failed'
                        ? JSON.parse(text).validation.body.message
                        : JSON.parse(text).message
            });
        });
    };

    register = (name, email, password) => {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }).then((res) => {
            return this.getResponse(res);
        });
    };

    authorize = (email, password) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((res) => this.getResponse(res));
    };

    checkToken = (token) => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((res) => this.getResponse(res));
    };
}

export const auth = new Auth({
    url: 'https://api.mj669.movies-explorer.nomoredomains.rocks'
    // url: 'http://localhost:3000'
});
