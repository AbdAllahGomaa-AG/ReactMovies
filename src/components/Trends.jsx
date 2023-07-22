import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "./Navbar";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import NoImage from "../assets/No.jpg";
import "../style/Videos.css";
import TrailersTrending from "../TrailersMovies/TrailersTrending";

function Trends() {
  const Api = `https://api.themoviedb.org/3`;
  const trendShow = `/trending/all/week`;
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [trendShowing, setTrendShowing] = useState([]);

  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const image = "https://image.tmdb.org/t/p/w500";

  const Trends = async () => {
    const data = await axios.get(`${Api}${trendShow}`, {
      params: {
        api_key: "a38ea663009ee6d15e968ca639026e36",
      },
    });
    const result = data.data.results;
    setTrendShowing(result);
  };

  useEffect(() => {
    setTimeout(() => {
      Trends();
    }, 100);
  }, [input]);
  console.log(trendShowing);
  const trendsTittle = (trend) => {
    setTitle(trend.title);
    setNumber(trend.vote_average);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryColor"}>
        <div className="movies-container">
          {trendShowing.map((trend) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color=" #fff"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => trendsTittle(trend)}
                  />
                  <img
                    src={
                      trend.poster_path
                        ? `${image}${trend.poster_path}`
                        : NoImage
                    }
                    alt=""
                    onClick={() => trendsTittle(trend)}
                  />
                  <h3 className={toggle ? `mainColor` : `secondaryColor`}>
                    {trend.title}{" "}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log() : <TrailersTrending TrendingTitle={title} />}

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
    </Fragment>
  );
}

export default Trends;
