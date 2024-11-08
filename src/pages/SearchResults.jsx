import {useEffect, useState} from "react";
import CustomNavbar from "../components/CustomNavbar.jsx";
import MovieCarousel from "../components/MovieCarousel.jsx";
import {Container, Row} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList.jsx";


function SearchResults() {
    const [searchResults, setSearchResults] = useState([])
    const [genres, setGenres] = useState([]);
    const SEARCH_URL = "http://localhost:4000/movies/searchresults";
    const [filterType, setFilterType] = useState('ascending');
    const [searchParams] = useSearchParams();
    const querystring = searchParams.get('querystring');

    useEffect(() => {
        if (querystring) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get(SEARCH_URL, {
                        params: { querystring },
                    });
                    setSearchResults(response.data.movies);
                    setGenres(response.data.genreList);
                } catch (err) {
                    console.error("Error fetching search results:", err);
                }
            };
            fetchSearchResults();
        }
    }, [querystring]);

    return (
        <>
            <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
            <Container fluid>
                <Row>
                    <MovieList movies={searchResults} genreList={genres} />
                </Row>
            </Container>
        </>
    )
}

export default SearchResults;