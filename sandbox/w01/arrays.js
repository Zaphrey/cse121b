const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = words.filter((word) => word.length > 6);
console.log(result);

const array1 = [1, 4, 9, 16];
const map1 = array1.map((x) => x * 2)
console.log(map1)

const array2 = [1, 2, 3, 4];
const initialValue = 0;
const sumWithInitial = array2.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
console.log(sumWithInitial);

let names = ["Nancy", "Blessing", "Jorge", "Svetlana", "Bob"];
const filteredNames = names.filter((word) => word[0].toLowerCase() === "b");
console.log(filteredNames);

const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

const avgNameLength = names.reduce((totalLength, name) => totalLength + name.length, 0) / names.length;
console.log(avgNameLength);