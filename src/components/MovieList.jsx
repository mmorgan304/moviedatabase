import { Col } from 'react-bootstrap';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

export const MovieList = ({ movies, genreList }) => {
    return (
        <>
            {movies.map((movie, index) => (
                <Col key={index} xs={12} sm={6} md={2} className="movie-card-col">
                    <MovieCard movie={movie} genreList={genreList} />
                </Col>
            ))}
        </>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            releaseDate: PropTypes.string.isRequired,
            posterPath: PropTypes.string.isRequired,
            overview: PropTypes.string.isRequired,
            genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired
        })
    ).isRequired,
    genreList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

export default MovieList;
