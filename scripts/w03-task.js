/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2){
    return number1 + number2;
}

function addNumbers(){
    let addNumber1 = Number(document.querySelector("#add1").value);
    let addNumber2 = Number(document.querySelector("#add2").value);

    let sumElement = document.querySelector("#sum");
    sumElement.value = add(addNumber1, addNumber2);
}

document.querySelector("#addNumbers").addEventListener("click", addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2){
    return number1 - number2;
}

const subtractNumbers = function(){
    let subtractNumber1 = Number(document.querySelector("#subtract1").value);
    let subtractNumber2 = Number(document.querySelector("#subtract2").value);

    let differenceElement = document.querySelector("#difference");
    differenceElement.value = subtract(subtractNumber1, subtractNumber2);
}

document.querySelector("#subtractNumbers").addEventListener("click", subtractNumbers);

/* Arrow Function - Multiply Numbers */
let multiply = (factor1, factor2) => factor1 * factor2;

let multiplyNumbers = () => document.querySelector("#product").value = multiply(
    Number(document.querySelector("#factor1").value), Number(document.querySelector("#factor2").value));

document.querySelector("#multiplyNumbers").addEventListener("click", multiplyNumbers);

/* Open Function Use - Divide Numbers */
function divide(number1, number2){
    return number1 / number2
}

function divideNumbers(){
    let dividend = Number(document.querySelector("#dividend").value);
    let divisor = Number(document.querySelector("#divisor").value);

    let quotientElement = document.querySelector("#quotient");
    quotientElement.value = divide(dividend, divisor);
}

document.querySelector("#divideNumbers").addEventListener("click", divideNumbers);

/* Decision Structure */

function getTotal(){
    let subTotal = Number(document.querySelector("#subtotal").value);
    let isClubMember = document.querySelector("#member").checked;

    console.log(subTotal, isClubMember);

    if (isClubMember) {
        subTotal -= (subTotal * 0.20);
    }

    console.log(subTotal);
    document.querySelector("#total").innerText = `\$${subTotal.toFixed(2)}`;
}

document.querySelector("#getTotal").addEventListener("click", getTotal)

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

/* Output Odds Only Array */
document.querySelector("#odds").innerText = numbers.filter((x) => x % 2 == 1);

/* Output Evens Only Array */
document.querySelector("#evens").innerText = numbers.filter((x) => x % 2 == 0);

/* Output Sum of Org. Array */
document.querySelector("#sumOfArray").innerText = numbers.reduce((previous, current) => previous + current);;

/* Output Multiplied by 2 Array */
document.querySelector("#multiplied").innerText = numbers.map((x) => x * 2);

/* Output Sum of Multiplied by 2 Array */
document.querySelector("#sumOfMultiplied").innerText = (numbers.map((x) => x * 2)).reduce((previous, current) => previous + current);