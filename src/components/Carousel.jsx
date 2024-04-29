import React, { useState } from "react";
import Card from "./Card";
import { useMediaQuery } from "react-responsive";

const Carousel = ({ films }) => {
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const slidesToShow = isDesktop ? 4 : isTablet ? 2 : 1;

  const getSlides = () => {
    if (films.length < slidesToShow) {
      return films;
    }
    const slides = [];
    for (let i = index; i < index + slidesToShow; i++) {
      slides.push(films[i % films.length]);
    }
    return slides;
  };

  return (
    <div className="carousel">
      <button
        className="carousel__arrow"
        onClick={() => setIndex(index == 0 ? films.length - 1 : index - 1)}
      >
        {"<"}
      </button>
      <div className="carousel__slides">
        {getSlides().map((film) => (
          <Card key={film.id} film={film} />
        ))}
      </div>
      <button className="carousel__arrow" onClick={() => setIndex(index + 1)}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
