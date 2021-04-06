import {
  GET_MOVIES,
  NETWORK_PROVIDER_RESOLUTION,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  CREATE_MOVIE,
} from './movies-action-types';

const BASE_URL = 'http://localhost:4000';

const generateFullEndpoint = (endpoint) => BASE_URL + endpoint;

const getHeaders = (method) => {
  const h = {
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    h['Content-Type'] = 'application/json';
  }
  return h;
};

const getConfig = (method = 'GET', payload) => ({
  method,
  body:
    payload
    && (typeof payload === 'string' ? payload : JSON.stringify(payload)),
  headers: getHeaders(method),
});

// GET MOVIES...
const actionRequestMovies = ({
  limit,
  offset,
  sortBy,
  sortOrder,
  filters,
}) => ({
  type: GET_MOVIES,
  endpoint: `/movies?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filters.toString()}`,
  method: 'GET',
});

const actionReceiveMovies = (movies) => ({
  type: GET_MOVIES + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movies,
});

export const getMovies = () => (dispatch, getState) => {
  const {
    limit,
    offset,
    sortBy,
    sortOrder,
    filters,
  } = getState().searchReducer;
  const action = actionRequestMovies({
    limit,
    offset,
    sortBy,
    sortOrder,
    filters,
  });
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
  })
    .then(
      (response) => response.json(),
      (error) => console.log('An error occurred.', error),
    )
    .then((json) => {
      const movies = json.data;
      dispatch(actionReceiveMovies(movies));
    });
};
// ...GET MOVIES

// DELETE MOVIE...
const actionRequestDeleteMovie = (movieId) => ({
  type: DELETE_MOVIE,
  endpoint: `/movies/${movieId}`,
  method: 'DELETE',
});

const actionResolvedDeleteMovie = (movieId) => ({
  type: DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movieId,
});

const actionFailedDeleteMovie = (movieId) => ({
  type: DELETE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
  payload: movieId,
});

export const deleteMovie = (movieId) => (dispatch) => {
  const action = actionRequestDeleteMovie(movieId);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        dispatch(actionResolvedDeleteMovie(movieId));
        dispatch(getMovies());
      } else {
        alert(`Can't delete movie with id ${movieId}`);
        dispatch(actionFailedDeleteMovie(movieId));
      }
    })
    .catch((error) => {
      alert(error);
      dispatch(actionFailedDeleteMovie(movieId));
    });
};
// ...DELETE MOVIE

// UPDATE MOVIE...
const actionRequestUpdateMovie = (movie) => ({
  type: UPDATE_MOVIE,
  endpoint: '/movies',
  method: 'PUT',
  payload: movie,
});

const actionResolvedUpdateMovie = (movieId) => ({
  type: UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
  payload: movieId,
});

const actionFailedUpdateMovie = (movieId) => ({
  type: UPDATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
  payload: movieId,
});

export const updateMovie = (movie) => (dispatch) => {
  const { id: movieId } = movie;
  const action = actionRequestUpdateMovie(movie);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        alert('Movie is successfully updated');
        dispatch(actionResolvedUpdateMovie(movieId));
        return Promise.resolve();
      }
      return response.json().then((json) => {
        const errorText = `Can't update movie ${movie.id}:${json.messages.map(
          (msg) => `\n- ${msg}`,
        )}`;
        return Promise.reject(errorText);
      });
    })
    .catch((error) => {
      alert(error);
      dispatch(actionFailedUpdateMovie(movieId));
      return Promise.reject(error);
    });
};
// ...UPDATE MOVIE

// CREATE MOVIE...
const actionRequestCreateMovie = (movie) => ({
  type: CREATE_MOVIE,
  endpoint: '/movies',
  method: 'POST',
  payload: movie,
});

const actionResolvedCreateMovie = () => ({
  type: CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.RESOLVED,
});

const actionFailedCreateMovie = () => ({
  type: CREATE_MOVIE + NETWORK_PROVIDER_RESOLUTION.FAILED,
});

export const createMovie = (movie) => (dispatch) => {
  const action = actionRequestCreateMovie(movie);
  dispatch(action);
  return fetch(generateFullEndpoint(action.endpoint), {
    ...getConfig(action.method, action.payload),
  })
    .then((response) => {
      if (response.ok) {
        dispatch(actionResolvedCreateMovie());
        alert('Movie is successfully created');
        dispatch(getMovies());
        return Promise.resolve();
      }
      return response.json().then((json) => {
        const errorText = `Can't create movie ${
          movie.title
        }:${json.messages.map((msg) => `\n- ${msg}`)}`;
        return Promise.reject(errorText);
      });
    })
    .catch((error) => {
      alert(error);
      dispatch(actionFailedCreateMovie());
      return Promise.reject(error);
    });
};
// ...CREATE MOVIE
