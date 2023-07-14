const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4MjgxYTVkMzkzYmFmZmU5MWExZjYxOWIwODQ1YSIsInN1YiI6IjY0N2FkODIwY2Y0YjhiMDBjM2QxZmQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPht9NB4oT7niXg8_u4Ih0Nty0AILZNga2NbrL9YUY8",
  },
};

const mainBase = "https://api.themoviedb.org";

const movies_config = [
  {
    url: `${mainBase}/3/trending/movie/day?language=en-US`,
    selector: "trending-movie",
  },
  {
    url: `${mainBase}/3/movie/popular?language=en-US&page=1`,
    selector: "popular",
  },
  {
    url: `${mainBase}/3/movie/upcoming?language=en-US&page=1`,
    selector: "upcoming",
  },
];

movies_config.forEach((e) => {
  fetchData(e.url, e.selector);
});

function handleHighlights(e) {
  let allElems = document.querySelectorAll(".hg-btn");
  allElems.forEach((f) => {
    f.style.backgroundColor = "#fff";
    f.style.color = "darkgreen";
  });
  e.style.backgroundColor = "rgb(43, 40, 40)";
  e.style.color = "#fff";
}

function fetchData(url, selector, clicked_elem) {
  if (clicked_elem) {
    handleHighlights(clicked_elem);
  }
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setTimeout(() => displaytrandingMovies(response, selector), 500);
    })
    .catch((err) => console.error("Error :", err));
}

function displaytrandingMovies(response, selectors) {
  let showingData = response.results;
  let getDataFromDiv = document.getElementById(selectors);

  getDataFromDiv.innerHTML = ""; // sanitise selector bcoz when you change pages last one should be empty

  for (let i = 0; i < showingData.length; i++) {
    getDataFromDiv.style.backgroundPosition = "bottom";

    let mainDiv = document.createElement("div");
    mainDiv.className = "movies-list";
    let imgDiv = document.createElement("div");
    imgDiv.className = "img-div";

    let dataDiv = document.createElement("div");
    dataDiv.className = "whole-div";

    let getImg =
      "https://www.themoviedb.org/t/p/w220_and_h330_face" +
      showingData[i].poster_path;

    let listingTrandingMovie = document.createElement("li");
    listingTrandingMovie.innerHTML = getImg;

    let trandingMovieImg = document.createElement("img");
    trandingMovieImg.src = getImg;

    imgDiv.appendChild(trandingMovieImg);

    let trandingMovieRating = document.createElement("div");
    trandingMovieRating.className = "movie-rating"; // class

    trandingMovieRating.innerHTML =
      Math.round((showingData[i].vote_average * 100) / 10) +
      "<span class='percent-data'>&nbsp;%</span>";
    dataDiv.appendChild(trandingMovieRating);

    let trandingMovieTitle = document.createElement("a");
    trandingMovieTitle.href = `/details.html`;
    trandingMovieTitle.className = "title-links";
    trandingMovieTitle.dataset.id = showingData[i].id;
    trandingMovieTitle.title =
      showingData[i].original_title || showingData[i].name;

    trandingMovieTitle.innerHTML =
      showingData[i].original_title || showingData[i].name;

    dataDiv.appendChild(trandingMovieTitle);

    let trandingMovieDate = document.createElement("h1");
    trandingMovieDate.className = "movie-date";
    trandingMovieDate.innerHTML =
      showingData[i].release_date || showingData[i].first_air_date;
    dataDiv.appendChild(trandingMovieDate);

    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(dataDiv);

    getDataFromDiv.appendChild(mainDiv);
  }
  addRedirectEvents();
}

// add events
function addRedirectEvents() {
  let allTitles = Array.from(document.querySelectorAll(".title-links"));
  allTitles.map((e) => {
    e.addEventListener("click", handleTitleClick);
  });
}

// handle event
function handleTitleClick(e) {
  e.preventDefault();
  let id = (e.target.dataset && e.target.dataset.id) || null;
  if (!id) {
    return;
  }
  localStorage.removeItem("id");
  localStorage.setItem("id", id);
  window.location.href = "/details.html";
}

window.addEventListener("load", function () {
  handleInputEvents();
});

function handleInputEvents() {
  let iSearch = document.querySelector("#input-search");
  iSearch.addEventListener("click", handleSearch);
}

function handleSearch(e) {
  let query = document.querySelector("#input-text").value;
  console.log(query, "query");
  let url = "/search.html" + `?query=${query}`;
  window.location.href = url;
}
