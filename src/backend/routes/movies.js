import express from "express";
import {
    getPopularMoviesController,
    getMovieDetailController,
    getTopRatedMoviesController, saveBookmarkController
} from "../controllers/MovieController.js";

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
        const { id } = req.body; // Extract 'id' from request body
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


export default router