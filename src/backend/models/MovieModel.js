import axios from "axios";
import {MovieDTO} from "../dtos/MovieDTO.js";
import {MovieDetailsDTO} from "../dtos/MovieDetailsDTO.js";
import db from "../db.js";

const TMDB_POPULAR = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const TMDB_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
const TMDB_MOVIE_GENRE = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const TMDB_MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/`;
const TMDB_TITLE_SEARCH = 'https://api.themoviedb.org/3/search/movie?query=';

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

export const getTitleSearchResults = async (querystring) => {
    try {
        const [moviesResponse, genreResponse] = await Promise.all([
            axios.get(`${TMDB_TITLE_SEARCH}${encodeURIComponent(querystring)}`, {
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
        throw e;
    }
}

export const getBookmarkedMovieInfo = async (bookmarkIds) => {
    try {
        const genrePromise = axios.get(TMDB_MOVIE_GENRE, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });

        const moviePromises = bookmarkIds.map(id =>
            axios.get(`${TMDB_MOVIE_DETAIL}/${id}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                },
            })
        );

        const [genreResponse, ...movieResponses] = await Promise.all([genrePromise, ...moviePromises]);
        const genreList = genreResponse.data.genres;

        const movies = movieResponses.map(response => {
            const movie = response.data;
            return new MovieDTO(
                movie.id,
                movie.title,
                movie.release_date,
                movie.poster_path,
                movie.overview,
                movie.genres.map(genre => genre.id) // Map genre objects to their IDs
            );
        });

        return {
            movies,
            genreList,
        };
    } catch (e) {
        console.error("Error fetching bookmarked movie info:", e.message);
        throw new Error("Failed to fetch movie data from TMDB");
    }
};

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

export const deleteBookmark = async (id) => {
    try {
        return await db.query("DELETE FROM bookmarkedmovies WHERE imdb_id = ?", [id]);
    } catch (e) {
        console.error("Error deleting bookmark:", e.message);
        throw new Error("Database error");
    }
}

export const isBookmarked = async (id) => {
    try {
        const [result] = await db.query("SELECT 1 FROM bookmarkedmovies WHERE imdb_id = ? LIMIT 1", [id]);
        return result.length > 0;
    } catch (e) {
        console.error("Error checking bookmark:", e.message);
        throw new Error("Database error");
    }
};

export const bookmarkList = async () => {
    try {
        const result = await db.query("SELECT imdb_id FROM bookmarkedmovies");
        console.log("Raw query result:", result);

        const rows = result[0];
        if (!rows || rows.length === 0) {
            console.log("No bookmarked movies found.");
            return [];
        }

        const tmdbIds = rows.map(row => row.imdb_id);
        console.log("TMDB IDs:", tmdbIds);

        return tmdbIds;
    } catch (e) {
        console.error("Error retrieving bookmark list:", e.message);
        throw new Error("Database error");
    }
};

