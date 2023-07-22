import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./Navbar";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import "../style/Videos.css";
import NoImage from "../assets/No.jpg";
import TrailersMovies from "../TrailersMovies/TrailersMovies";

function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [MoviesData, setMoviesData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");
  const shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${shown}/movie`;
  const image = "https://image.tmdb.org/t/p/w500";

  const MoviesCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "a38ea663009ee6d15e968ca639026e36",
        query: input,
      },
    });
    const result = data.data.results;
    setMoviesData(result);
  };
  useEffect(() => {
    setTimeout(() => {
      MoviesCall();
    }, 100);
  }, [input]);
  console.log(MoviesData);

  const MoviesCallTitle = (movie) => {
    setTitle(movie.title);
    setTrailer(!trailer);
  };

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryColor"}>
        <div className="movies-container">
          {MoviesData.map((movie) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color=" #fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesCallTitle(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${image}${movie.poster_path}`
                        : NoImage
                    }
                    alt=""
                    onClick={() => MoviesCallTitle(movie)}
                  />
                  <h3 id={movie.title.length > 28 ? "smaller-Text" : ""}>
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log() : <TrailersMovies movieTitle={title} />}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            fontSize={55}
            color="#fff"
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </>
  );
}

export default Movies;
