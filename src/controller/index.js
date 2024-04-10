import { ListCharacter } from "../Model/ListCharacter.js";
import { MarvelCharacter } from "../Model/MarvelCharacter.js";
import { MarvelComic } from "../Model/MarvelComic.js";
import { MarvelSeries } from "../Model/MarvelSeries.js";

const listCharacter = new ListCharacter(); 

const publicApiKey = '641f333beb32e17083700c8e1ccc4938';
const privateApiKey = 'bbd61e396a861f9e973b69b778ef0bca587343ed';

function generateHash(ts) {
    const hashInput = ts + privateApiKey + publicApiKey;
    return md5(hashInput);
}

async function fetchData(endpoint) {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);
    const url = `https://gateway.marvel.com/v1/public/${endpoint}?apikey=${publicApiKey}&ts=${ts}&hash=${hash}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
}

function clearContainer(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
}

document.getElementById('btnCharacters').addEventListener('click', async () => {
    clearContainer('comics-container');
    clearContainer('series-container');

    const charactersData = await fetchData('characters');
    const charactersContainer = document.getElementById('characters-container');

    charactersContainer.innerHTML = '';

    charactersData.forEach(characterData => {
        const character = new MarvelCharacter();
        character.setId(characterData.id);
        character.setName(characterData.name);
        character.setDescription(characterData.description);
        character.setThumbnail(`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`);

        listCharacter.addCharacter(character); 
        const characterElement = document.createElement('div');
        characterElement.classList.add('card', 'character-card');

        const imageElement = document.createElement('img');
        imageElement.src = character.getThumbnail();
        imageElement.alt = character.getName();

        const nameElement = document.createElement('div');
        nameElement.classList.add('title');
        nameElement.textContent = character.getName();

        characterElement.appendChild(imageElement);
        characterElement.appendChild(nameElement);
        charactersContainer.appendChild(characterElement);
    });
});

document.getElementById('btnComics').addEventListener('click', async () => {
    clearContainer('characters-container');
    clearContainer('series-container');

    const comicsData = await fetchData('comics');
    const comicsContainer = document.getElementById('comics-container');

    comicsContainer.innerHTML = '';

    comicsData.forEach(comicData => {
        const comic = new MarvelComic();
        comic.setId(comicData.id);
        comic.setTitle(comicData.title);
        comic.setIssueNumber(comicData.issueNumber);
        comic.setDescription(comicData.description);
        comic.setThumbnail(`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`);

        const comicElement = document.createElement('div');
        comicElement.classList.add('card', 'comic-card');

        const imageElement = document.createElement('img');
        imageElement.src = comic.getThumbnail();
        imageElement.alt = comic.getTitle();

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = comic.getTitle();

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = comic.getDescription() || 'No hay descripción disponible';

        comicElement.appendChild(imageElement);
        comicElement.appendChild(titleElement);
        comicElement.appendChild(descriptionElement);
        comicsContainer.appendChild(comicElement);
    });
});

document.getElementById('btnSeries').addEventListener('click', async () => {
    clearContainer('characters-container');
    clearContainer('comics-container');

    const seriesData = await fetchData('series');
    const seriesContainer = document.getElementById('series-container');

    seriesContainer.innerHTML = '';

    seriesData.forEach(seriesData => {
        const series = new MarvelSeries();
        series.setId(seriesData.id);
        series.setTitle(seriesData.title);
        series.setDescription(seriesData.description);
        series.setStartYear(seriesData.startYear);
        series.setThumbnail(`${seriesData.thumbnail.path}.${seriesData.thumbnail.extension}`);

        const seriesElement = document.createElement('div');
        seriesElement.classList.add('card', 'series-card');

        const imageElement = document.createElement('img');
        imageElement.src = series.getThumbnail();
        imageElement.alt = series.getTitle();

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = series.getTitle();

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = series.getDescription() || 'No hay descripción disponible';

        seriesElement.appendChild(imageElement);
        seriesElement.appendChild(titleElement);
        seriesElement.appendChild(descriptionElement);
        seriesContainer.appendChild(seriesElement);
    });
});
