import axios from "axios";
import { useEffect, useState } from "react";
import { MovieItem } from "./MovieItem";
import "./styles.css";
import { MoviePagination } from "./MoviePagination";

const countVisibleMovie = 50;

export const MoviesList = () => {
  const [totalMovies, setTotalMovies] = useState(0);
  const [moviesList, setMoviesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getMoviesListPerPage = async () => {
    try {
      const response = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?limit=${countVisibleMovie}&page=${currentPage}`
        // "https://yts.mx/api/v2/list_movies.json"
      );
      setMoviesList(response.data.data.movies);
      setTotalMovies(response.data.data.movie_count);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  useEffect(() => {
    getMoviesListPerPage();
  }, [currentPage]);

  return (
    <>
      <div className="movies-page-container">
        <div className="movies-header-outer">
          <div className="movies-header">
            <p className="movies-header-title">Movies</p>
            <MoviePagination
              total={Math.ceil(totalMovies / countVisibleMovie)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className="movies-container">
          <div className="movies-wrapper">
            {moviesList.map((movie) => (
              <MovieItem movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
