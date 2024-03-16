let firstName = "Antonia";
let lastName = "Francesca";

function fullName(firstName, lastName){
    return `${firstName} ${lastName}`;
}

console.log(fullName(firstName, lastName));

const fullName2 = function(firstName, lastName){
    return `${firstName} ${lastName}`
}

console.log(fullName2(firstName, lastName));

const fullName3 = (first, last) => `${first} ${last}`;

console.log(fullName3(firstName, lastName));

const fullNameElement = document.querySelector("#fullName");
fullNameElement.innerText = fullName(firstName, lastName);