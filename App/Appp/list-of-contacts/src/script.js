const NUM_CONTACTS = 50;

let contactId = 1;

const firstNames = [
  "Emma",
  "Noah",
  "Olivia",
  "Liam",
  "Ava",
  "William",
  "Sophia",
  "Mason",
  "Isabella",
  "James",
  "Mia",
  "Benjamin",
  "Charlotte",
  "Jacob",
  "Abigail",
  "Michael",
  "Emily",
  "Elijah",
  "Harper",
  "Ethan",
  "Amelia",
  "Alexander",
  "Evelyn",
  "Oliver",
  "Elizabeth",
  "Daniel",
  "Sofia",
  "Lucas",
  "Madison",
  "Matthew",
  "Avery",
  "Aiden",
  "Ella",
  "Jackson",
  "Scarlett",
  "Logan",
  "Grace",
  "David",
  "Chloe",
  "Joseph",
  "Victoria",
  "Samuel",
  "Riley",
  "Henry",
  "Aria",
  "Owen",
  "Lily",
  "Sebastian",
  "Aubrey",
  "Gabriel",
  "Zoey",
  "Carter",
  "Penelope",
  "Jayden",
  "Lillian",
  "John",
  "Addison",
  "Luke",
  "Layla",
  "Anthony",
  "Natalie",
  "Isaac",
  "Camila",
  "Dylan",
  "Hannah",
  "Wyatt",
  "Brooklyn",
  "Andrew",
  "Zoe",
  "Joshua",
  "Nora",
  "Christopher",
  "Leah",
  "Grayson",
  "Savannah",
  "Jack",
  "Audrey",
  "Julian",
  "Claire",
  "Ryan",
  "Eleanor",
  "Jaxon",
  "Skylar",
  "Levi",
  "Ellie",
  "Nathan",
  "Samantha",
  "Caleb",
  "Stella",
  "Hunter",
  "Paisley",
  "Christian",
  "Violet",
  "Isaiah",
  "Mila",
  "Thomas",
  "Allison",
  "Aaron",
  "Alexa",
  "Lincoln"
];

const lastNames = [
  "Smith",
  "Jones",
  "Brown",
  "Johnson",
  "Williams",
  "Miller",
  "Taylor",
  "Wilson",
  "Davis",
  "White",
  "Clark",
  "Hall",
  "Thomas",
  "Thompson",
  "Moore",
  "Hill",
  "Walker",
  "Anderson",
  "Wright",
  "Martin",
  "Wood",
  "Allen",
  "Robinson",
  "Lewis",
  "Scott",
  "Young",
  "Jackson",
  "Adams",
  "Tryniski",
  "Green",
  "Evans",
  "King",
  "Baker",
  "John",
  "Harris",
  "Roberts",
  "Campbell",
  "James",
  "Stewart",
  "Lee",
  "County",
  "Turner",
  "Parker",
  "Cook",
  "Mc",
  "Edwards",
  "Morris",
  "Mitchell",
  "Bell",
  "Ward",
  "Watson",
  "Morgan",
  "Davies",
  "Cooper",
  "Phillips",
  "Rogers",
  "Gray",
  "Hughes",
  "Harrison",
  "Carter",
  "Murphy"
];

// generate a random number between min and max
const rand = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// generate a name
const generateName = () =>
  `${firstNames[rand(firstNames.length - 1)]} ${
    lastNames[rand(lastNames.length - 1)]
  }`;

// generate a phone number
const generatePhoneNumber = () =>
  `${rand(999, 100)}-${rand(999, 100)}-${rand(9999, 1000)}`;

// create a person
const createContact = () => ({
  id: contactId++,
  name: generateName(),
  phone: generatePhoneNumber()
});

// add keys to based on index
//const addKeys = (val, key) => ({key, ...val})
const addKeys = (val) => ({ key: val.id.toString(), ...val });

const contacts = Array.from({ length: NUM_CONTACTS }, createContact).map(
  addKeys
);

// DEBUG
// console.log('contacts', contacts)

/**
 * Return a list of contacts indexed by the name's first letter.
 *
 * E.g: [A: [{id: 4, key: "4", name: "Alexa Taylor", phone: "555-555-5555"}]]
 */
const contactsByLetter = contacts.reduce((obj, contact) => {
  const firstLetter = contact.name[0].toUpperCase();
  return {
    ...obj,
    [firstLetter]: [...(obj[firstLetter] || []), contact]
  };
}, {});

/**
 * Create a list of objects made up of contacts organised by sections according
 * to the contact first letter of their name.
 *
 * E.g.:
 * [{data: [{id: 7, key: "7", name: "Skylar Davies", phone: "555-555-5555"}], title: "S"}]
 */
const sections = Object.keys(contactsByLetter)
  .sort()
  .map((letter) => ({
    data: contactsByLetter[letter],
    title: letter
  }));

// DEBUG
// console.log('contactsByLetter', contactsByLetter)
console.log("sections", sections);

const conElt = document.getElementById("contacts");
const lastDiv = document.getElementById("lastDiv");

let newDiv1, newDiv2, newSpan;
let newContent;

sections.map((sec) => {
  // console.log('sec', sec)
  newDiv1 = document.createElement("div");
  newDiv1.setAttribute("class", "sec");
  newSpan = document.createElement("span");
  newContent = document.createTextNode(sec.title);
  newSpan.appendChild(newContent);
  newDiv1.appendChild(newSpan);
  sec.data.map((con) => {
    // console.log('con', con)
    newDiv2 = document.createElement("div");
    newDiv2.setAttribute("class", "con");
    newContent = document.createTextNode(con.name + " " + con.phone);
    newDiv2.appendChild(newContent);
    newDiv1.appendChild(newDiv2);
  });
  conElt.insertBefore(newDiv1, lastDiv);
});
