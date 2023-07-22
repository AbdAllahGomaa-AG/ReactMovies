import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import NoImage from "../assets/No.jpg";
import { Container } from "./Navbar";
import "../style/Videos.css";
import TrailersTvShow from "../TrailersMovies/TrailersTvShow";

function TvShow() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");
  const shown = input ? "search" : "discover";

  const Api = `https://api.themoviedb.org/3/${shown}/tv`;
  const image = "https://image.tmdb.org/t/p/w500";

  const TvShow = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "a38ea663009ee6d15e968ca639026e36",
        query: input,
      },
    });

    const result = data.data.results;
    setShowData(result);
  };
  useEffect(() => {
    setTimeout(() => {
      TvShow();
    }, 100);
  }, [input]);

  console.log(showData);

  const TvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };

  return (
    <>
      <div className={toggle ? "mainBgColor" : "secondaryColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color=" #fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TvShowTitle(shows)}
                  />
                  <img
                    src={
                      shows.poster_path
                        ? `${image}${shows.poster_path}`
                        : NoImage
                    }
                    alt=""
                    onClick={() => TvShowTitle(shows)}
                  />
                  <h3
                    id={shows.name.length > 28 ? "smaller-Text" : ""}
                    className={toggle ? `mainColor` : `secondaryColor`}
                  >
                    {" "}
                    {shows.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log() : <TrailersTvShow TvShowTitle={title} />}

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

export default TvShow;
