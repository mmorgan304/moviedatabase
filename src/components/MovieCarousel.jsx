import { useEffect, useState, useRef } from "react";
import MovieList from "./MovieList";
import axios from "axios";
import PropTypes from "prop-types";
import {Spinner} from "react-bootstrap";

//look at api to see if there are options to filterType as part of the axios request
const MovieCarousel = ({ title, endpoint, filterType }) => {
    const [movies, setMovies] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null); // Ref for the scrolling container

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000${endpoint}`);
                setMovies(response.data.movies || []);
                setGenreList(response.data.genreList || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [endpoint]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="movie-carousel">
            <h2>{title}</h2>
            <div className="carousel-wrapper">
                <button className="carousel-arrow left-arrow" onMouseEnter={scrollLeft}>&lt;</button>
                <div className="movie-scroller" ref={scrollRef}>
                    {loading ? <Spinner animation="border" variant="dark"/> : <MovieList movies={movies} genreList={genreList} />}
                </div>
                <button className="carousel-arrow right-arrow" onMouseEnter={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

MovieCarousel.propTypes = {
    title: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired
};

export default MovieCarousel;
