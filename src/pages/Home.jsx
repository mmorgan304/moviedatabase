import {useEffect, useState} from "react";
import CustomNavbar from "../components/CustomNavbar.jsx";
import {Container} from "react-bootstrap";
import MovieCarousel from "../components/MovieCarousel.jsx";


// make search work
// add "see more" to movie carousels
// make genres clickable to search for more of that genre
// add bookmark and thumbs up/down functionality

function Home() {
    const [searchResults, setSearchResults] = useState([])
    const SEARCH_URL = "http://localhost:4000/movies/search";
    const [filterType, setFilterType] = useState('ascending');

    return (
        <>
            <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
            <Container fluid>
                <MovieCarousel title="Popular Movies" endpoint="/movies/popular" filterType={filterType}/>
                <MovieCarousel title="Top Rated Movies" endpoint="/movies/toprated" filterType={filterType}/>
            </Container>
        </>
    );
}

export default Home;