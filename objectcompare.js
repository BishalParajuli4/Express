let bishal = {name: "bishal", age: 21};
let sujan =  {name:"bishal",age: 21};

const compare = bishal.age === sujan.age;
const namecompare = bishal.name === sujan.name;
if (compare === namecompare){
    console.log ("Both name and age is true");

}
else{
console.log ("The name is",namecompare);
console.log ("The age is", compare);
}

const bishalkeys = object.keys(bishal); // ['name' , 'age']
const sujankeys = object.keys(sujan); // ['name' , 'age']

bishalkeys.map((bishalkey) => {
    const isKeyExistInBoth = sujankeys.find((sujankey) => {
        return bishalkey === sujankey;

    });

    keysAreEqual = BOolean (isKeyExistInBoth)
})


