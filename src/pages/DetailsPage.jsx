import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import config from "../config.json";
import Error from "../components/Error";

const DetailsPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchFilm = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
        headers: {
          "x-api-key": config.apiKey,
        },
      });
      setFilm(await data.json());
    } catch (e) {
      console.log(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilm();
  }, [id]);

  if (isError) {
    return (
      <Error>
        <h2>
          Вернуться на <Link to="/">главную</Link>
        </h2>
      </Error>
    );
  }

  if (!film || isLoading) {
    return <Loader />;
  }

  return (
    <div className="details">
      <h1 className="details__title">{film.name}</h1>
      <div className="details__rate">{film.rating.imdb}/10</div>
      <div>
        <img
          className="details__image"
          src={film.poster.url}
          alt={`${film.name} poster`}
        />
        <p className="details__description">{film.description}</p>
        <div className="features">
          <div className="feature">
            <div className="feature__title">Длительность: </div>
            <div className="feature__value">{film.movieLength} мин</div>
          </div>
          <div className="feature">
            <div className="feature__title">Дата выхода: </div>
            <div className="feature__value">
              {new Date(film.premiere.world).toLocaleDateString()}
            </div>
          </div>
          <div className="feature">
            <div className="feature__title">Жанр: </div>
            <div className="feature__value">
              {film.genres.map((genre) => genre.name).join(", ")}
            </div>
          </div>
          <div className="feature">
            <div className="feature__title">Страны: </div>
            <div className="feature__value">
              {film.countries.map((genre) => genre.name).join(", ")}
            </div>
          </div>
          <div className="feature">
            <div className="feature__title">Бюджет: </div>
            <div className="feature__value">
              {film.budget.value + film.budget.currency}
            </div>
          </div>
        </div>
      </div>
      <div className="similar-films">
        <h2 className="similar-films__heading">Похожие фильмы</h2>
        <div className="similar-films__items">
          {film.similarMovies.map((film) => (
            <Card key={film.id} film={film} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
