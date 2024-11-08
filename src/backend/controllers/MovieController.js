import {
    bookmarkList,
    deleteBookmark,
    getMovieDetail,
    getPopularMovies, getTitleSearchResults,
    getTopRatedMovies, isBookmarked,
    saveBookmark
} from "../models/MovieModel.js";

export const getPopularMoviesController = async () => {
    return await getPopularMovies()
}

export const getTopRatedMoviesController = async () => {
    return await getTopRatedMovies()
}

export const getTitleSearchResultsController = async (querystring) => {
    return await getTitleSearchResults(querystring)
}

export const getMovieDetailController = async (id) => {
    return await getMovieDetail(id)
}

export const saveBookmarkController = async (id) => {
    return await saveBookmark(id);
}

export const deleteBookmarkController = async (id) => {
    return await deleteBookmark(id);
}

export const isBookmarkedController = async (id) => {
    return await isBookmarked(id);
};

export const bookmarkListController = async () => {
    return await bookmarkList();
}
