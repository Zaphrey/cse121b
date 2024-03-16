let array1 = ["one", "two", "three"];
let htmlArray1 = array1.map((item) => `<li>${item}</li>`);
document.getElementById("myList").innerHTML = htmlArray1.join();

const letterGrades = ["A", "B", "A"];

function getGpaFromGrade(grade){
    if (grade === "A"){
        return 4;
    }
    else if (grade === "B"){
        return 3;
    }
    else {
        return -1;
    }
}

const gpaGrades = letterGrades.map(getGpaFromGrade)
console.log(gpaGrades)

const collectiveGpa = gpaGrades.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);

const gpa = collectiveGpa / gpaGrades.length;
console.log(gpa);

const fruits = ["watermelon", "peach", "apple", "tomato", "grape"];
const filteredFruits = fruits.filter(fruit => fruit.length < 6);
console.log(filteredFruits);

const numbers = [12, 34, 21, 54];
const luckNumber = 21;
const luckNumberIdx = numbers.indexOf(luckNumber);
console.log(luckNumberIdx);