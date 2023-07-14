const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2M4MjgxYTVkMzkzYmFmZmU5MWExZjYxOWIwODQ1YSIsInN1YiI6IjY0N2FkODIwY2Y0YjhiMDBjM2QxZmQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPht9NB4oT7niXg8_u4Ih0Nty0AILZNga2NbrL9YUY8",
  },
};

const mainBase = "https://api.themoviedb.org";
let id = localStorage.getItem("id") || null;
let detailsBase = `${mainBase}/3/movie/${id}?language=en-US`;
let castBase = `${mainBase}/3/movie/${id}/credits?language=en-US`;

window.addEventListener("load", () => {
  responseData();
  getCast();
});

function responseData() {
  if (!id) {
    alert("Something went wrong");
    return;
  }

  fetch(detailsBase, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (!response || response.success === false) {
        detailsBase = `${mainBase}/3/tv/${id}?language=en-US`;

        responseData();
        return;
      }
      handleDetailsPage(response);
    })
    .catch((err) => console.error("Error :", err));
}

function handleDetailsPage(response) {
  let getDetails = document.getElementById("details-movie");
  getDetails.innerHTML = "";

  let getImg = response.poster_path
    ? "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" +
      response.poster_path
    : "https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80";

  let movieTitle = response.title || response.name;
  let release_date = response.release_date || "";
  let genres = response.genres.map((e) => e.name);
  let runTime = response.runtime || "";
  let rating =
    Math.round((response.vote_average * 100) / 10) +
    "<span class='percent-data1'>%</span>";

  let trailor = "https://www.youtube.com/watch?v=ElZfdU54Cp8";

  let tagLine = response.tagline;

  let overview = response.overview;

  let detailsHtml = `
  
  <div class ="container-details">
  <div class = "image-contain"> <img src ="${getImg}"/> </div>
  <div class ="coloum-details">  
  <div class = "title-contain">${movieTitle}</div>
  <div class ="contain-three">
  <div class = "date-contain">  ${release_date}(US)<strong> - </strong></div>
  <div class = "genres-contain">${genres}<strong> - </strong></div>
  <div class = "runtime">${runTime} Minutes</div>
  </div>
  <div class ="contain-two">
  <div class = "user-rating">${rating}</div>
  <a class ="vedio-link">
  <iframe id="yt" class ="vid"  src="${trailor}" width = "200px" height ="100px" frameborder="0" allowfullscreen ></iframe>
 <button id ="content"> Play Trailor</button>  
  </a>
  </div>
  <div class = "tagline">${tagLine}</div>
  <div class = "overview">Overview  <br> <br> ${overview} 
  </div>
</div>`;

  getDetails.innerHTML += detailsHtml;
}

function getCast() {
  if (!id) {
    alert("Something went wrong");
    return;
  }

  fetch(castBase, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (!response || response.success === false) {
        castBase = `${mainBase}/3/tv/${id}/credits?language=en-US`;
        console.log(castBase);
        getCast();
        return;
      }
      handleCrew(response);
    })
    .catch((err) => console.error(err));
}

function handleCrew(response) {
  let castData = document.getElementById("castData");

  response.cast.length = 12;

  response = response.cast.forEach((e) => {
    let castImg =
      "https://www.themoviedb.org/t/p/w138_and_h175_face" + e.profile_path;

    let castName = e.name;
    let character = e.character;

    let updateCastData = `<div class ="updateDataCast">
    <div class ="column-cast">
    <div class ="image-cast"><img src ="${castImg}" /></div>
    <div class ="name-cast">${castName}</div>
    <div class ="character">${character}</div>
    </div>
    </div>`;

    castData.innerHTML += updateCastData;
  });
}
