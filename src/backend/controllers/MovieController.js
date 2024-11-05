import {getMovieDetail, getPopularMovies, getTopRatedMovies, saveBookmark} from "../models/MovieModel.js";

export const getPopularMoviesController = async () => {
    return await getPopularMovies()
}

export const getTopRatedMoviesController = async () => {
    return await getTopRatedMovies()
}

export const getMovieDetailController = async (id) => {
    return await getMovieDetail(id)
}

export const saveBookmarkController = async (id) => {
    return await saveBookmark(id);
}