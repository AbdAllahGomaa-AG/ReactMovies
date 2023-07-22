import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import "../style/NavbarStyle.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import TvShow from "./TvShow";
import Trends from "./Trends";
import PricingOne from "./PricingOne";


export const Container = React.createContext();
function Navbar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState(true);
  return (
    <Container.Provider value={{ toggle, inputValue }}>
      <>
        <nav className={toggle ? " " : "navBarColor"}>
          <div className="nav-options">
            <h1 id={toggle ? "" : "heading"}>RECT MOVIE</h1>
            <NavLink
              to=""
              style={({ isActive }) => {
                return { color: isActive ? "#FFF" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Movies</span>
            </NavLink>
            <NavLink
              to="/TvShow"
              style={({ isActive }) => {
                return { color: isActive ? "#FFF" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Tv show</span>
            </NavLink>
            <NavLink
              to="/Trends"
              style={({ isActive }) => {
                return { color: isActive ? "#FFF" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>tending</span>
            </NavLink>

          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search whatever You want"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch fontSize={21} color="green" id="search" />
            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShow" element={<TvShow />} />
          <Route path="Trends" element={<Trends />} />
        </Routes>
      </>
    </Container.Provider>
  );
}

export default Navbar;
