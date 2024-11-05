export class MovieDetailsDTO {
    constructor(id, title, posterPath, backdropPath, genres, overview, releaseDate, runtime, homepage) {
        this.id = id;
        this.title = title;
        this.posterPath = `https://image.tmdb.org/t/p/original${posterPath}`;
        this.backdropPath = `https://image.tmdb.org/t/p/original${backdropPath}`;
        this.genres = genres;
        this.overview = overview;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.homepage = homepage;
    }

}