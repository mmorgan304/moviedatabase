import {useEffect, useState} from 'react';
import MovieList from '../components/MovieList'; // Renders the movies in rows of cards
import axios from 'axios';
import {Container, Row} from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar.jsx";

function BookmarkedMovies() {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([])
    const SEARCH_URL = "http://localhost:4000/movies/searchresults";

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/movies/bookmarklist');
                setBookmarkedMovies(response.data.movies);
                setGenreList(response.data.genreList);
            } catch (err) {
                console.error("Error fetching bookmarked movies:", err);
                setError("Failed to load bookmarked movies.");
            }
        };

        fetchBookmarks(); // Call the function to fetch data
    }, []); // Empty dependency array ensures this runs only once on component mount

    if (error) {
        return <p>{error}</p>; // Display error message if something goes wrong
    }

    return (
        <>
            <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
            <Container fluid></Container>
            <Row>
                <MovieList movies={bookmarkedMovies} genreList={genreList}/>
            </Row>
        </>
    );
}

export default BookmarkedMovies;
