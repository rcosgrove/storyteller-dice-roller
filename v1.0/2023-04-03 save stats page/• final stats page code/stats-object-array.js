// https://www.w3schools.com/js/js_objects.asp
// https://www.geeksforgeeks.org/how-to-add-an-object-to-an-array-in-javascript/
// https://stackabuse.com/bytes/push-an-object-to-an-array-in-javascript/
// https://www.w3schools.com/js/js_switch.asp

// ADDITIONAL GLOBAL VARIABLES

var vCharname = document.getElementById("charname").text;
var vArmor = document.getElementById("armor").value;
var vAthletics = document.getElementById("athletics").value;
var vBrawl = document.getElementById("brawl").value;
var vDexterity = document.getElementById("dexterity").value;
var vDodge = document.getElementById("dodge").value;
var vFirearms = document.getElementById("firearms").value;
var vForm = "homid";
var vMelee = document.getElementById("melee").value;
var vStamina = document.getElementById("stamina").value;
var vStrength = document.getElementById("strength").value;
var vWits = document.getElementById("wits").value;
var vSpecies = "2";
var SpeciesSelected;
var ObjectName;
const vDexterityBase = vDexterity;
const vStaminaBase = vStamina;
const vStrengthBase = vStrength;
const SavedCharacters = {};

function TestFunc1() {
    console.log("Test func 1 declared and ran");
}

function SetSpecies() {
    // Set vSpecies on menu change

    let SpeciesSelected = document.getElementById("SpeciesMenu");
    SpeciesSelected.addEventListener("change", function handleChange(event) {
        vSpecies = event.target.value;
        console.log("vSpecies variable is: " + vSpecies);
    })
}

function StatsSave() {
    console.log("Running StatSave function");

    // test object
    // set object ID to charname variable

    console.log("Creating character object");

    let character = {
        Name: "value",
        set Name(value) {
         [this.Name] = charname},
        Species: "value",
        set Species(value) {
         [this.Species] = vSpecies},
        Strength: document.getElementById("strength").value,
        Dexerity: document.getElementById("dexterity").value,
        Stamina: document.getElementById("stamina").value,
        Wits: document.getElementById("wits").value,
        Brawl: document.getElementById("brawl").value,
        Melee: document.getElementById("melee").value,
        Firearms: document.getElementById("firearms").value,
        Dodge: document.getElementById("dodge").value,
        Athletics: document.getElementById("athletics").value,
        Armor: document.getElementById("armor").value,
    }

    Object.assign(SavedCharacters, character);

}


