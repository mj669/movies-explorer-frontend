import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
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

  let location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  return (
    <div className="app">
      {headerPaths.includes(location.pathname) ? (
        <Header loggedIn={loggedIn} />
      ) : (
        ''
      )}
      <Routes>
        <Route
          path="/"
          element={<Main />}
          loggedIn={loggedIn}
        />
        <Route
          path="/movies"
          element={<Movies />}
          loggedIn={loggedIn}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/profile"
          element={<Profile />}
          loggedIn={loggedIn}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies />}
          loggedIn={loggedIn}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
      {footerPaths.includes(location.pathname) ? <Footer /> : ''}
    </div>
  );
}

export default App;
