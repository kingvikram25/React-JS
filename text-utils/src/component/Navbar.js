import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

export default function Navbar({
  title,
  aboutText,
  mode,
  toggleMode,
  changeMode,
  greyBg,
  greenBg,
  blackBg,
}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className={`container-fluid bg-${mode}`}>
          <a className="navbar-brand navHeading" href="/">
            {title}
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active navHeading"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link navHeading" to="/about">
                  {aboutText}
                </Link> */}
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success navHeading"
                type="submit"
              >
                Search
              </button>
            </form> */}
            {/* here we commemt search button here. */}

            {/* <div
              className={`coloums text-${mode === "white" ? "black" : "white"}`}
            >
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioNoLabel"
                  id="radioNoLabel1"
                  value=""
                  aria-label="..."
                  onClick={greenBg}
                />
              </div>
              <p>Green BG</p>

              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioNoLabel"
                  id="radioNoLabel1"
                  value=""
                  aria-label="..."
                  onClick={greyBg}
                />
              </div>
              <p>Grey BG</p>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioNoLabel"
                  id="radioNoLabel1"
                  value=""
                  aria-label="..."
                  onClick={blackBg}
                />
              </div>
              <p>Black BG</p>
            </div> */}

            <div className={`form-check form-switch`}>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={toggleMode}
              />
              <label
                className={`form-check-label  text-${
                  mode === "white" ? "black" : "white"
                }`}
                htmlFor="flexSwitchCheckDefault"
              >
                {changeMode}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
};

// Navbar.defaultProps = {
//   title: "Set Title Here",
//   aboutText: "About Text Here",
// };

// reactFunctionComponent (rfc)
