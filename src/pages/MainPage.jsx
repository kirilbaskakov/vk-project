import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Card from "../components/Card";
import Loader from "../components/Loader";
import config from "../config.json";
import Error from "../components/Error";

const MainPage = () => {
  const [currPage, setCurrPage] = useState(1);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const limit = 24;
  const pagesAmount = 273 / 24;

  const fetchFilms = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie?page=${currPage}&limit=${limit}&lists=top250`,
        {
          headers: {
            "x-api-key": config.apiKey,
          },
        }
      );
      setFilms((await data.json()).docs);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFilms();
  }, [currPage]);

  const getPages = () => {
    if (pagesAmount < 6) {
      let pages = [];
      for (let i = 1; i <= pagesAmount; i++) {
        pages.push(i);
      }
      return pages;
    }
    const pageEnd = Math.min(pagesAmount, currPage + 4);
    const pageStart = Math.max(1, Math.min(pageEnd - 4, currPage - 2));
    return [
      pageStart,
      pageStart + 1,
      pageStart + 2,
      pageStart + 3,
      pageStart + 4,
    ];
  };

  if (isError) {
    return (
      <Error>
        <h2>Попробуйте перезагрузить страницу</h2>
      </Error>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Лучшие фильмы</h1>
      <div className="film-cards">
        {films.map((film) => (
          <Card key={film.id} film={film} />
        ))}
      </div>
      <div className="pagination">
        <button
          className={classNames("pagination__page", { hidden: currPage == 1 })}
          onClick={() => setCurrPage(currPage - 1)}
        >
          ←
        </button>
        {getPages().map((page) => (
          <button
            className={classNames("pagination__page", {
              selected: page == currPage,
            })}
            onClick={() => setCurrPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button
          className={classNames("pagination__page", {
            hidden: currPage == pagesAmount,
          })}
          onClick={() => setCurrPage(currPage + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MainPage;
