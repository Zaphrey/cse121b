/* W05: Programming Tasks */

/* Declare and initialize global variables */

const templeUrl = "https://byui-cse.github.io/cse121b-ww-course/resources/temples.json";
const templeElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */

const displayTemples = (temples) => {
    temples.forEach(temple => {
        const article = document.createElement("article");

        const header = document.createElement("h3");
        header.textContent = temple.templeName;

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.location;

        article.appendChild(header);
        article.appendChild(image);

        templeElement.appendChild(article);
    })
};

/* async getTemples Function using fetch()*/

const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");

    if (response.ok) {
        templeList = await response.json();
        displayTemples(templeList)
    }
}

/* reset Function */

function reset () {
    while (templeElement.hasChildNodes()) {
        templeElement.removeChild(templeElement.firstChild);
    };
};

/* filterTemples Function */

function filterTemples (temples) {
    reset();

    const filter = document.querySelector("#filtered");

    switch (filter.value) {
        case "utah":
            displayTemples(temples.filter((temple) => temple.location.toLowerCase().includes("utah")));
            break;
        case "notutah":
            displayTemples(temples.filter((temple) => !temple.location.toLowerCase().includes("utah")));
            break;
        case "older":
            displayTemples(temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0, 1)));
            break;
        case "all":
            console.log(temples);
            displayTemples(temples);
            break;
    };
};

getTemples();
console.log(templeList);

/* Event Listener */

document.querySelector("#filtered").addEventListener("change", () => { filterTemples(templeList) });