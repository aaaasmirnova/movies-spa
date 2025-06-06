import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles.css";
import { ImageWithFallback } from "./ImageWithFallback";

export const MovieItem = ({ movie }) => {
  return (
    <div className="movie-card">
      <ImageWithFallback src={movie.medium_cover_image} alt={movie.title} />

      <div className="movie-card-hover">
        <div className="movie-card-hover-content">
          <div className="movie-card-rating-wrapper">
            <span>
              <FaStar size={20} color="#2e95dc" />
            </span>
            <span className="movie-card-rating">{movie.rating}</span>
          </div>
          <div className="movie-card-genres-wrapper">
            {movie.genres.map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
          </div>
          <Link to={`/movies/${movie.id}`} className="movie-card-more-button">
            More
          </Link>
        </div>
        <div className="movie-title-year-hover">
          <p className="movie-title-hover">{movie.title}</p>
          <p className="movie-year-hover">{movie.year}</p>
        </div>
      </div>
    </div>
  );
};
