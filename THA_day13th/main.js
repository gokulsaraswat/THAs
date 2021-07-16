const article = document.querySelector("article");
const searchBtn = document.querySelector("button");
const inputEl = document.querySelector("input");

searchBtn.addEventListener("click", fetchDogs);
fetchDogs();

function fetchDogs() {
  article.innerHTML = "";
  fetch(`https://dog.ceo/api/breed/${inputEl.value}/images/random/10`)
    .then((res) => res.json())
    .then((data) => {
      getResponse(data);
    });
}