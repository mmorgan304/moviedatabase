import express from "express";
import {
    getPopularMoviesController,
    getMovieDetailController,
    getTopRatedMoviesController,
    saveBookmarkController,
    deleteBookmarkController,
    isBookmarkedController,
    getTitleSearchResultsController, bookmarkListController
} from "../controllers/MovieController.js";
import {getBookmarkedMovieInfo} from "../models/MovieModel.js";

const router = express.Router();

router.get("/popular", async (req, res) => {
    try {
        const { movies, genreList } = await getPopularMoviesController()
        res.send({
            movies,
            genreList
        });
    } catch (error) {
        console.error("Axios error message:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(400).send("Internal Server Error");
    }
});

router.get("/toprated", async (req, res) => {
    try {
        const { movies, genreList } = await getTopRatedMoviesController()
        res.send({
            movies,
            genreList
        });
    } catch (error) {
        console.error("Axios error message:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(400).send("Internal Server Error");
    }
});

router.get('/searchresults', async (req, res) => {
    try {
        const querystring = req.query.querystring;
        console.log(querystring);
        const { movies, genreList } = await getTitleSearchResultsController(querystring);
        res.send({
            movies,
            genreList
        });
    } catch (error) {
        console.error("Axios error message:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(400).send("Internal Server Error");
    }
})

// repeat for more movie carousels etc

router.get("/moviedetail/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {movie, genreList} = await getMovieDetailController(id)
        res.send({
            movie,
            genreList
        });
    } catch (error) {
        console.error("Axios error message:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(400).send("Internal Server Error");
    }
});

router.post("/savebookmark", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send("Movie ID is required.");
        }

        const dbResponse = await saveBookmarkController(id); // Save bookmark to the database

        if (dbResponse) {
            res.send("Bookmarked successfully"); // Success response
        } else {
            res.status(500).send("Failed to bookmark movie."); // Database response check
        }
    } catch (error) {
        console.error("Error in saveBookmark route:", error.message); // Log error details
        res.status(500).send("Internal Server Error"); // Server error response
    }
});

router.delete("/deletebookmark/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract id from the URL
        if (!id) {
            return res.status(400).send("Movie ID is required.");
        }
        const dbResponse = await deleteBookmarkController(id);

        if (dbResponse) {
            res.send("Bookmark removed successfully"); // Success response
        } else {
            res.status(500).send("Failed to remove bookmark."); // Database response check
        }

    } catch (error) {
        console.error("Error in deleteBookmark route:", error.message); // Log error details
        res.status(500).send("Internal Server Error");
    }
});

router.get("/isbookmarked/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const isBookmarked = await isBookmarkedController(id);
        res.json({ isBookmarked });
    } catch (error) {
        console.error("Error checking bookmark state:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/bookmarklist", async (req, res) => {
    try {
        const bookmarkList = await bookmarkListController();
        console.log("bookmark list :" + bookmarkList);
        const { movies, genreList } = await getBookmarkedMovieInfo(bookmarkList);
        res.send({ movies, genreList });
        console.log("Bookmark list response:", { movies, genreList });
    } catch (e) {
        console.error("Error getting bookmark list:", e.message);
        res.status(500).send("Internal Server Error");
    }
})
export default router