import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const MovieDetailedInfo = () => {
  const { id } = useParams();
  //   const savedComments = localStorage.getItem("comments");
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState(null);
  const [commentText, setCommentText] = useState("");
  //   const [comments, setComments] = useState(JSON.parse(savedComments) || {});
  const [comments, setComments] = useLocalStorage("comments", {});

  const movieComments = comments[id] || [];

  const goBack = () => navigate(-1);

  const getMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );

      setMovieInfo(response.data.data.movie);
    } catch (err) {
      console.error("Произошла ошибка", err);
    }
  };

  useEffect(() => {
    getMovieInfo();
  }, [id]);

  const changeCommentText = (event) => {
    setCommentText(event.target.value);
  };

  const formattedDate = new Date()
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at")
    .replace("AM", "am")
    .replace("PM", "pm");

  const addComment = () => {
    if (!commentText.trim()) return;
    const idComment =
      movieComments.length !== 0
        ? movieComments[movieComments.length - 1].idComment + 1
        : 1;
    const newComment = {
      idComment,
      name: "You",
      text: commentText,
      date: formattedDate,
    };
    setComments({ ...comments, [id]: [...movieComments, newComment] });

    setCommentText("");
  };

  //   useEffect(() => {
  //     localStorage.setItem("comments", JSON.stringify(comments));
  //   }, [comments]);

  const deleteComment = (idComm) => {
    setComments({
      ...comments,
      [id]: movieComments.filter((comment) => comment.idComment !== idComm),
    });
  };

  return (
    <div className="movies-page-container ">
      <div className="movies-header-outer">
        <div className="movies-header">
          <p className="movies-header-title">{movieInfo?.title}</p>
          <button onClick={goBack} className="movies-button-back-list">
            <RiArrowGoBackFill color="white" />
          </button>
        </div>
      </div>

      <div className="movie-detailed-content">
        {movieInfo && (
          <div className="movie-detailed-info-wrapper">
            <div className="movie-detailed-info-image-wrapper">
              <img
                src={movieInfo.medium_cover_image}
                className="movie-detailed-info-image"
              ></img>
              <div className="movie-detailed-rating-wrapper">
                <span>
                  <FaStar size={20} color="#2e95dc" />
                </span>
                <span className="movie-detailed-card-rating">
                  {movieInfo.rating}
                </span>
              </div>
            </div>

            <div>
              <h1 className="movie-detailed-info-title">{movieInfo.title}</h1>
              <p className="movie-detailed-info-year">{movieInfo.year}</p>
              <div className="movie-detailed-info-genres">
                {movieInfo?.genres.map((genre) => (
                  <p key={genre} className="movie-detailed-info-genre">
                    {genre}
                  </p>
                ))}
              </div>
              <p className="movie-detailed-info-synopsis">Synopsis</p>
              <p className="movie-detailed-info-comments">Comments</p>

              <div className="comments-wrapper">
                {movieComments.length > 0 &&
                  movieComments.map((comment, index) => (
                    <div className="comment-info-wrapper" key={index}>
                      <div className="comment-info-inner-wrapper">
                        <div className="comment-name-date-delete-wrapper">
                          <div className="comment-name-date-wrapper">
                            <p className="comment-info">You</p>
                            <p className="comment-info">{comment.date}</p>
                          </div>
                          <button
                            className="delete-comment-button"
                            onClick={() => deleteComment(comment.idComment)}
                          ></button>
                        </div>
                        <p className="comment-info comment-text" key={index}>
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="add-comment-wrapper">
                <input
                  type="text"
                  value={commentText}
                  onChange={changeCommentText}
                  placeholder="Leave a comment"
                />
                <button onClick={addComment} className="add-comment-button">
                  <RiArrowGoBackFill color="white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
