import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Container, Row, Col, Card, Spinner} from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar.jsx";
import {Bookmark, BookmarkFill, HandThumbsDown, HandThumbsUp} from "react-bootstrap-icons";

function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength);
    }
    return text || "N/A"; // Default to "N/A" if text is undefined or empty
}

export const MovieDetail = () => {
    const [bookmark, setBookmark] = useState(false);

    const [searchResults, setSearchResults] = useState([])
    const SEARCH_URL = "http://localhost:4000/movies/search";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movie, setMovie] = useState({});
    const {id} = useParams();

    const genreNames = movie.genres ? movie.genres.map(genre => genre.name).join(", ") : "N/A";

    const MOVIE_DETAIL_URL = `http://localhost:4000/movies/moviedetail/${id}`;

    const saveBookmark = async () => {
        try {
            await fetch("http://localhost:4000/movies/savebookmark", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: movie.id })
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    const deleteBookmark = async () => {
        try {
            await fetch(`http://localhost:4000/movies/deletebookmark/${movie.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleBookmarkClick = () => {
        setBookmark(!bookmark);

        if (!bookmark){
            saveBookmark();
        } else {
            deleteBookmark();
        }
    }

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(MOVIE_DETAIL_URL);
                setMovie(response.data.movie);

                const bookmarkResponse = await fetch(`http://localhost:4000/movies/isbookmarked/${id}`);
                const bookmarkData = await bookmarkResponse.json();
                setBookmark(bookmarkData.isBookmarked);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetail();
        }
    }, [id]);

    if (loading) return <Spinner animation="border" variant="dark" />;
    if (error) return <p>Error loading movie details.</p>;

    return (
        <>
            <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
            <Container fluid className="movie-detail-background"
                       style={{backgroundImage: `url(${movie.backdropPath || ''})`}}>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} md={8} lg={6}>
                        <Card className="p-4 movie-detail-card">
                            <Row>
                                <Col xs={12} md={4}>
                                    <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                                        <Card.Img src={movie.posterPath || ''} alt={`${movie.title || 'Movie'} poster`}
                                                  className="mb-3"/>
                                    </a>
                                </Col>
                                <Col xs={12} md={8}>
                                    <div>
                                        <h2>{movie.title || "Unknown Title"} ({movie.releaseDate ? truncateText(movie.releaseDate, 4) : "N/A"})</h2>
                                    </div>
                                    <div>
                                        <p><strong>Genres:</strong> {genreNames}</p>
                                        <p>{movie.overview || "No overview available."}</p>
                                        <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : "N/A"}</p>
                                    </div>
                                    <div>
                                        <HandThumbsUp size="36" color="blue"/>
                                        <HandThumbsDown size="36" color="blue"/>
                                        {bookmark === false ? <Bookmark size="36" color="blue" onClick={handleBookmarkClick}/> :
                                            <BookmarkFill size="36" color="blue" onClick={handleBookmarkClick}/>}
                                    </div>


                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
