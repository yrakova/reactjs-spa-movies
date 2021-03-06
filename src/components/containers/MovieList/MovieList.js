import React, { useState } from 'react';
import { connect } from 'react-redux';
import MovieCardErrorBoundary from '~/components/error-boundaries/MovieCardErrorBoundary';
import MovieCard from '~/components/MovieCard';
import DeleteMovieModal from '../../modals/DeleteMovieModal';
import AddMovieModal from '../../modals/AddMovieModal';
import {
  deleteMovie,
  updateMovie,
} from '../../../store/actions/movies-actions';
import EmptyBlock from '../../EmptyBlock';

const getMovieById = (id, movies) => movies.find((movie) => movie.id === id);

const MovieList = ({ movies, requestDeleteMovie, requestUpdateMovie }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  const optionsHandler = (action, movieId) => {
    setCurrentMovieId(movieId);
    switch (action) {
      case 'edit':
        setShowEditForm(true);
        break;
      case 'delete':
        setShowDeleteForm(true);
        break;
      case 'close':
        break;
      default:
        throw new Error(`Unknown action ${action}`);
    }
  };

  const resetState = () => {
    setShowDeleteForm(false);
    setShowEditForm(false);
    setCurrentMovieId(null);
  };

  const onDeleteFormAction = (action, movieId) => {
    switch (action) {
      case 'confirm':
        requestDeleteMovie(movieId);
        resetState();
        break;
      case 'close':
        resetState();
        break;
      default:
        throw new Error(`Unknown action from Delete From: ${action}`);
    }
  };

  const onEditFormAction = (formAction, mutableMovie = null) => {
    switch (formAction) {
      case 'close':
        resetState();
        break;
      case 'update':
        requestUpdateMovie(mutableMovie).then(() => resetState());
        break;
      case 'create':
        break;
      default:
        throw new Error(`unknown action ${formAction}`);
    }
  };

  const getMoviesBlock = () => (movies.length ? (
    movies.map((movie) => (
      <MovieCardErrorBoundary key={movie.id}>
        <MovieCard movie={movie} optionsHandler={optionsHandler} />
      </MovieCardErrorBoundary>
    ))
  ) : (
    <EmptyBlock />
  ));

  return (
    <>
      {getMoviesBlock()}
      <DeleteMovieModal
        show={showDeleteForm}
        onAction={onDeleteFormAction}
        movieId={currentMovieId}
      />
      <AddMovieModal
        isEdit
        movie={getMovieById(currentMovieId, movies)}
        show={showEditForm}
        onAction={onEditFormAction}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  movies: state.moviesReducer.movies,
});

const mapDispatchToProps = (dispatch) => ({
  requestDeleteMovie: (movieId) => dispatch(deleteMovie(movieId)),
  requestUpdateMovie: (movie) => dispatch(updateMovie(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
