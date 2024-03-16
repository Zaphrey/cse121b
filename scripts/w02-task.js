/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */

let fullName = "Zachary Humphreys";
let currentYear = "2024";
let profilePicture = "images/me_with_friends.jpg";

/* Step 3 - Element Variables */

const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector("img");

/* Step 4 - Adding Content */

nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute("src", profilePicture);

/* Step 5 - Array */

let favoriteFoods = ["Lasagna", "Chicken Enchiladas", "Sausage Rice", "Caesar Salad"];
foodElement.innerHTML = `${favoriteFoods}`;

// Declare and append tomato soup to food element
let favoriteFood = "Tomato Soup";
favoriteFoods.push(favoriteFood);
foodElement.innerHTML += `<br>${favoriteFoods}`;

// Remove first element from favorite food array
// and append the same array to the food element
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;
