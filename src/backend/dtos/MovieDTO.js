export class MovieDTO {
    constructor(id, title, releaseDate, posterPath, overview, genreList) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.posterPath = `https://image.tmdb.org/t/p/original${posterPath}`;
        this.overview = overview;
        this.genreList = genreList;
    }
}
