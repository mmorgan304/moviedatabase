import {Card} from "react-bootstrap";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength);
    }
    return text;
}

function getGenreNames(genreIds, genreList) {
    return genreIds.map(id => {
        const genre = genreList.find(g => g.id === id);
        return genre ? genre.name : null;
    }).filter(Boolean);
}

function MovieCard({ movie, genreList }) {
    const genreNames = getGenreNames(movie.genreList, genreList);
    const navigate = useNavigate();
    const onCardClick = () => {
        navigate(`/movies/moviedetail/${movie.id}`);
    }
    return (
        <Card onClick={onCardClick}>
            <Card.Img
                variant='top'
                src={movie.posterPath}
                alt='poster'
                className="movie-card-img"
            />
            <Card.Body className="movie-card-body">
                <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                <Card.Text>{truncateText(movie.releaseDate, 4)}</Card.Text>
                <Card.Text className="movie-card-details">{genreNames.join(', ')}</Card.Text>
                <Card.Text className="movie-card-overview">{movie.overview}</Card.Text>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        posterPath: PropTypes.string,
        title: PropTypes.string.isRequired,
        genreList: PropTypes.arrayOf(PropTypes.number).isRequired,
        releaseDate: PropTypes.string,
        overview: PropTypes.string,
    }).isRequired,
    genreList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

export default MovieCard;
