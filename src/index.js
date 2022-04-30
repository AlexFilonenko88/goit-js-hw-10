// import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const listElement = document.querySelector('.country-list');
const divElement = document.querySelector('.country-info');

input.addEventListener('input', onInput);

function onInput(e) { 
    const value = e.target.value;
    
    if (value.length === 1) {
        alert("Мало букв!");
    }
    fetchCountris(value);
};

function fetchCountris(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => response.json())
        .then(onMarkUp)
        .then(listMarkup)
    .catch(onError)
};

function onMarkUp(obj) {
    console.log(obj)
    return obj.map(countri => { 
        if (obj.length > 1) {
            divElement.innerHTML = '';
            return onListMarkap(countri);
        } 
            listElement.innerHTML = '';
            divElement.innerHTML = onCardMarkap(countri);
    }).join("");
};

function listMarkup(markup) {
    listElement.innerHTML = markup;
};

function onListMarkap(countri) {
    return `<li><p><img src="${countri.flags.svg}" width="60" />${countri.name.official}</p></li>`;
};

function onCardMarkap(countri) {
    return `<h2><img src="${countri.flags.svg}" width = "60" alt="">${countri.name.official}</h2><p>Столица: ${countri.capital}</p><p>Население: ${countri.population}</p><p>Языки: ${Object.values(countri.languages)}</p>`
};

function onError() {
    alert("Такой страны нет!");

    listElement.innerHTML = '';
    divElement.innerHTML = '';
};