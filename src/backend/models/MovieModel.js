import axios from "axios";
import {MovieDTO} from "../dtos/MovieDTO.js";
import {MovieDetailsDTO} from "../dtos/MovieDetailsDTO.js";
import {saveBookmarkController} from "../controllers/MovieController.js";
import db from "../db.js";

const TMDB_POPULAR = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const TMDB_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
const TMDB_MOVIE_GENRE = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const TMDB_MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/`;

export const getPopularMovies = async () => {
    try {
        const [moviesResponse, genreResponse] = await Promise.all([
            axios.get(TMDB_POPULAR, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }),
            axios.get(TMDB_MOVIE_GENRE, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            })
        ]);
        const movies = moviesResponse.data.results;
        const cleanedMovies = movies.map(movie => new MovieDTO(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview, movie.genre_ids));
        return {
            movies: cleanedMovies,
            genreList: genreResponse.data.genres
        };
    } catch (e) {
        console.error("Error fetching movies:", e.message);
    }
}

export const getTopRatedMovies = async () => {
    try {
        const [moviesResponse, genreResponse] = await Promise.all([
            axios.get(TMDB_TOP_RATED, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }),
            axios.get(TMDB_MOVIE_GENRE, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            })
        ]);
        const movies = moviesResponse.data.results;
        const cleanedMovies = movies.map(movie => new MovieDTO(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview, movie.genre_ids));
        return {
            movies: cleanedMovies,
            genreList: genreResponse.data.genres
        };
    } catch (e) {
        console.error("Error fetching movies:", e.message);
    }
}

export const getMovieDetail = async (id) => {
    try {
        const [movieResponse, genreResponse] = await Promise.all([
            axios.get(`${TMDB_MOVIE_DETAIL}${id}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }),
        ]);
        const movie = movieResponse.data;
        const cleanedMovie = new MovieDetailsDTO(movie.id, movie.title, movie.poster_path, movie.backdrop_path, movie.genres, movie.overview, movie.release_date, movie.runtime, movie.homepage )
        return {
            movie: cleanedMovie,
        };
    } catch (e) {
        console.error("Error fetching movie:", e.message);
    }

}

export const saveBookmark = async (id) => {
    try {
        return await db.query("INSERT INTO bookmarkedmovies (imdb_id) values (?)",
            [id])
    } catch (e) {
        console.error("Error saving to bookmarkedmovies:", e.message);
        throw new Error("Database error");
    }
}
