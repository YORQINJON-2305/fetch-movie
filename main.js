const elForm = document.querySelector(".search-form");
const elSearchInput = elForm.querySelector(".search-input");
const elTypeSelect = elForm.querySelector(".type-select");
const elYearInput = elForm.querySelector(".year-input");
const elList = document.querySelector(".movies-collection");

const elTemplate = document.querySelector(".movie-temp").content;
const globalFragment = new DocumentFragment();

function getApi(inputValue, selectValue, yearInputValue){
    fetch(`https://omdbapi.com/?&apikey=223e06f&s=${inputValue}&type=${selectValue}&y=${yearInputValue}`)
        .then(res => res.json())
        .then(data => renderMovies(data.Search))
        .catch(err => console.log(err));
}

function renderMovies(arr){
    arr.forEach(item => {
        const templateClone = elTemplate.cloneNode(true);
        templateClone.querySelector(".movie-img").src = item.Poster
        templateClone.querySelector(".movie-img").alt = item.Title;
        templateClone.querySelector(".movie-title").textContent = item.Title;
        templateClone.querySelector(".movie-year").textContent = item.Year
        templateClone.querySelector(".category").textContent = item.Type

        globalFragment.appendChild(templateClone)
    });
    elList.appendChild(globalFragment);
}

elForm.addEventListener("submit", function (evt){
    evt.preventDefault();
    elList.innerHTML = "";
    getApi(elSearchInput.value, elTypeSelect.value, elYearInput.value);
});

