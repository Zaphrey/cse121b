/* LESSON 3 - Programming Tasks */

/* Profile Object  */

let myProfile = {
    name: "Zachary Humphreys",
    photo: "images/me_with_friends.jpg",
    favoriteFoods: [
        "Lasagna", 
        "Chicken Enchiladas", 
        "Sausage Rice", 
        "Caesar Salad", 
        "Tomato Soup"
    ],
    hobbies: [
        "Walking",
        "Game Development",
        "3D Modeling",
    ],
    placesLived: [],
};


/* Populate Profile Object with placesLive objects */

myProfile.placesLived.push(
    {
        place: "Orem, UT",
        length: "7 years"
    },
    {
        place: "Columbus, GA",
        length: "6 months"
    },
    {
        place: "Macon, GA",
        length: "13 years"
    }
)

/* DOM Manipulation - Output */

/* Name */

document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */

document.querySelector("#photo").src = myProfile.photo;
document.querySelector("#photo").alt = myProfile.name;

/* Favorite Foods List*/

myProfile.favoriteFoods.forEach(function(food){
    let ulElement = document.querySelector("#favorite-foods");
    let liElement = document.createElement("li");
    liElement.textContent = food;

    ulElement.appendChild(liElement);
});

/* Hobbies List */

myProfile.hobbies.forEach(function(hobby){
    let ulElement = document.querySelector("#hobbies");
    let liElement = document.createElement("li");
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
});

/* Places Lived DataList */

myProfile.placesLived.forEach(function(obj){
    let dlElement = document.querySelector("#places-lived");
    let dtElement = document.createElement("dt");
    let ddElement = document.createElement("dd");

    dtElement.textContent = obj.place;
    ddElement.textContent = obj.length;

    dlElement.appendChild(dtElement);
    dlElement.appendChild(ddElement);
});
