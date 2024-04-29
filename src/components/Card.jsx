import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ film }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/details/${film.id}`);
  };

  return (
    <div className="film-card" onClick={onClick}>
      <img
        className="film-card__image"
        src={film.poster.previewUrl}
        alt={`Постер "${film.name}"`}
      />
      <div className="film-card__text">
        <span className="film-card__rate">{film.rating.imdb}</span>
        <div>
          <h3 className="film-card__title">{film.name}</h3>
          <span className="film-card__date">{film.year}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
