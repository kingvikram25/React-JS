const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4MjgxYTVkMzkzYmFmZmU5MWExZjYxOWIwODQ1YSIsInN1YiI6IjY0N2FkODIwY2Y0YjhiMDBjM2QxZmQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPht9NB4oT7niXg8_u4Ih0Nty0AILZNga2NbrL9YUY8",
  },
};

window.addEventListener("load", function () {
  setTimeout(handleSearchDisplay, 500);
});

const mainBase = "https://api.themoviedb.org";
let firstDisp = true;

function doSearch(query, url, selector) {
  let search;
  if (!url) {
    search = `${mainBase}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  } else {
    search = url;
  }

  fetch(search, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (firstDisp) {
        handleNum(response.total_results, "mv");
        setTimeout(() => handleSearchResults(response), 1000);
      } else {
        handleNum(response.total_results, selector);
      }
    })
    .catch((err) => console.error(err));
}

function handleSearchResults(response) {
  let searchRes = response.results;

  let getSearchResult = document.getElementById("search-result");

  getSearchResult.innerHTML +=
    '<div id="search-results-container" class="whole-container-searchList nm"></div>';
  let myResultsContainer = document.querySelector("#search-results-container");
  searchRes.forEach((e) => {
    let searchImage = e.poster_path
      ? "https://themoviedb.org/t/p/w94_and_h141_bestv2" + e.poster_path
      : "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80";

    let searchTitle = e.title || e.name;
    let searchDate = e.release_date || e.first_air_date;
    let searchOverview = e.overview;

    let innerData = `

  <div class ="search-container">
  <div class ="search-image"><img src="${searchImage}"/></div>
  <div class= "collection">
  <div class = "title-links">
  <a class ="search-title" href="/details.html" data-id ="${e.id}" style="text-decoration: none"  >
  ${searchTitle} </a>
  </div>
  <div class ="search-date">${searchDate}</div>
  <div class ="search-overview">${searchOverview}</div>
  </div>
  </div>
`;
    myResultsContainer.innerHTML += innerData;
  });

  addRedirectEvents();
}

function handleSearchDisplay() {
  let query = window.location.search.split("=")[1];
  if (!query || query.length === 0) {
    return alert("No Data");
  }

  doSearch(query);
}

// add events
function addRedirectEvents() {
  let allTitles = Array.from(document.querySelectorAll(".search-title"));
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

function handleNum(num, selector) {
  let elemToAddNum = document.querySelector("#" + selector);
  console.log(elemToAddNum);
  if (!num || !elemToAddNum) {
    return;
  }
  elemToAddNum.innerHTML += ` <div> ${num} </div> `;
  if (firstDisp) {
    firstDisp = false;
    handleApiReqs();
  }
}

function getQuery() {
  let query = window.location.search.split("=")[1];
  if (!query || query.length === 0) {
    return;
  }
  return query;
}

function handleApiReqs() {
  // doSearch();
  let query = getQuery();
  console.log(query, "query new");

  // TV
  doSearch(
    query,
    `${mainBase}/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    "tv"
  );

  // Companies
  doSearch(
    query,
    `${mainBase}/3/search/company?query=${query}&include_adult=false&language=en-US&page=1`,
    "cp"
  );

  // keyword
  doSearch(
    query,
    `${mainBase}/3/search/keyword?query=${query}&include_adult=false&language=en-US&page=1`,
    "kw"
  );

  // collection
  doSearch(
    query,
    `${mainBase}/3/search/collection?query=${query}&include_adult=false&language=en-US&page=1`,
    "cl"
  );

  // people
  doSearch(
    query,
    `${mainBase}/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
    "pl"
  );
}

function handleHighlightSearch(e) {
  let allElems = Array.from(document.querySelectorAll(".select-search"));

  for (i = 0; i < allElems.length; i++) {
    let f = allElems[i];
    f.classList.add("select-search");
    f.classList.remove("select-search-active");
  }
  e.classList.add("select-search-active");
  //e.classList.remove("select-search"); //this is bug actual that not be like it
}

function handleClickSearchRender(base, hlSearch) {
  if (hlSearch) {
    handleHighlightSearch(hlSearch);
  }

  let part1 = `&include_adult=false&language=en-US&page=1`;
  let query = getQuery();
  let main = `${mainBase}/3/search/${base}?query=` + query + part1;

  fetch(main, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.results);
      let container = document.querySelector("#search-results-container");
      container.innerHTML = "";
      handleGlobalSearchResults(response, base);
    });
}

function handleGlobalSearchResults(response, base) {
  let searchRes = response.results;

  let myResultsContainer = document.querySelector("#search-results-container");
  searchRes.forEach((e) => {
    let searchImage = e.poster_path
      ? "https://themoviedb.org/t/p/w94_and_h141_bestv2" + e.poster_path
      : e.profile_path
      ? "https://themoviedb.org/t/p/w94_and_h141_bestv2" + e.profile_path
      : "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80";

    let searchTitle = e.title || e.name;
    let searchDate = e.release_date || "";
    let searchOverview = e.overview || "";
    let innerData;
    if (base === "company" || base === "keyword") {
      innerData = `
      <div class ="search-container">
      <div class= "collection">
      <div class = "title-links">
      <a class ="search-title" data-id ="${e.id}" style="text-decoration: none"  >
      ${searchTitle} </a>
      </div>
      <div class ="search-date">${searchDate}</div>
      <div class ="search-overview">${searchOverview}</div>
      </div>
      </div>`;
    } else {
      innerData = `
  <div class ="search-container">
  <div class ="search-image"><img src="${searchImage}"/></div>
  <div class= "collection">
  <div class = "title-links">
  <a class ="search-title" href="/details.html" data-id ="${e.id}" style="text-decoration: none"  >
  ${searchTitle} </a>
  </div>
  <div class ="search-date">${searchDate}</div>
  <div class ="search-overview">${searchOverview}</div>
  </div>
  </div>
`;
    }
    myResultsContainer.innerHTML += innerData;
  });

  addRedirectEvents();
}
