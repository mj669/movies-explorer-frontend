import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoudPage/NotFoudPage';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const mainApi = new MainApi({
    url: 'https://api.mj669.movies-explorer.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  }, []);

  useEffect(() => {
    loggedIn &&
      mainApi
        .getUserData()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Что-то пошло не так... (${err})`);
        });
    loggedIn &&
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('movies')) {
        setMovies(JSON.parse(localStorage.getItem('movies')));
      } else {
        moviesApi
          .getMovies()
          .then((movies) => {
            localStorage.setItem('movies', JSON.stringify(movies));
            setMovies(movies);
          })
          .catch((err) => {
            console.log(`Ошибка.....: ${err}`);
          });
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    loggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, loggedIn]);

  const handleLogin = (values) => {
    setIsLoading(true);
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setLoginErrorMessage('');
          navigate('/movies');
        } else if (data.error === 'Bad Request') {
          setLoginErrorMessage('Введены невалидные данные');
        } else if (data.message) {
          setLoginErrorMessage(data.message);
        }
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
        setLoginErrorMessage('Что-то пошло не так...');
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (values) => {
    setIsLoading(true);
    auth
      .register(values.name, values.email, values.password)
      .then((res) => {
        if (res.user) {
          setRegisterErrorMessage('')
          handleLogin(values);
        } else if (res.error === 'Bad Request') {
          setRegisterErrorMessage('Введены невалидные данные');
        } else if (res.message) {
          setRegisterErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
        setRegisterErrorMessage('Что-то пошло не так...');
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = (user, setIsEditing ) => {
    setIsLoading(true);
    mainApi
      .editProfile(user)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: user.name,
          email: user.email
        });
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        setIsEditing(false);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
  };

  const handleMovieLike = (movie, isLiked, id) => {
    if (isLiked) {
      handleMovieDelete(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  };

  const handleMovieDelete = (id) => {
    const searchedSavedMovies = JSON.parse(
      localStorage.getItem('searchedSavedMovies')
    );
    mainApi
      .deleteMovie(id)
      .then((res) => {
        const updatedSavedMovies = savedMovies.filter(
          (movie) => movie._id !== id
        );
        setSavedMovies(updatedSavedMovies);
        if (searchedSavedMovies) {
          const updatedSearchedSavedMovies = searchedSavedMovies.filter(
            (movie) => movie._id !== id
          );
          localStorage.setItem(
            'searchedSavedMovies',
            JSON.stringify(updatedSearchedSavedMovies)
          );
        }
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {headerPaths.includes(location.pathname) && (
          <Header loggedIn={loggedIn} />
        )}
        <main>
          <Routes>
            <Route
              path="/"
              element={<Main />}
            />
            <Route
              path="/signup"
              element={<Register
                onRegister={handleRegister}
                loggedIn={loggedIn}
                isLoading={isLoading}
                errorMessage={registerErrorMessage}
              />}
            />
            <Route
              path="/signin"
              element={<Login
                onLogin={handleLogin}
                loggedIn={loggedIn}
                isLoading={isLoading}
                errorMessage={loginErrorMessage}
              />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  movies={movies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onLikeMovie={handleMovieLike}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteMovie={handleMovieDelete}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="*"
              element={<NotFoundPage loggedIn={loggedIn} />}
            />
          </Routes>
        </main>
        {footerPaths.includes(location.pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
