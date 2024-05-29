import movies from './movie-data.json';

const DEFAULT_PAGE_SIZE = 5;

const countOfMovies = async() => {
    return movies.movies.length;
};

const fetchMovies = async() => {
    return movies.movies;
};

export { DEFAULT_PAGE_SIZE, countOfMovies, fetchMovies };