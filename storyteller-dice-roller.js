// STORYTELLER RPG DICE ROLLER

// Created by Richard Cosgrove

// Distributed under GNU GPL v3.0

// Last update 2023-02-23

// version 0.1.0 

// USAGE NOTES
// This roller uses the dice mechanics from the Original World of Darkness 20th Anniversary Edition rulebooks:
// 10s do not explode, but give 2 successes.
// Each 1 removes one success.
// Botches only occur if a 1 and no successess are rolled. 


// VARIABLES

// let vWins = successes
// let vFails = fails
// let vBotches = botches
// let vResultsCalc = successes minus botches
// let vFinal = successes minus botches

// PRE-SET VARIABLES FOR TESTING
// const vDiff = 6; // activate for testing script
// const vPool = 4; // activate for testing script
// const vWinsExtra = 0; // activate for testing script
// const vBotchesExtra = 0; // activate for testing script

const DiceRollsArray = []; // array storing generated integars

let vWins = 0; // number of rolls equal or more than target
let vFails = 0; // number of rolls less than target
let vBotches = 0; // number of times "1" rolled
let vDiceResult = 0;
let vCalc = 0; // result of vWins minus vBotches
let vFinal = "Result"; // "SUCCESS", "FAIL" or "BOTCH" string 

// PROMPT USER TO DEFINE VARIABLES - WORKING OK

// Ask user for number of dice to roll
// DiceRoll loop will be repeated this number of times
const vPool = prompt("Number of dice to roll?",4);

// Ask user for difficulty
// Difficulty = target number for successful roll
const vDiff = prompt("Difficulty?",6); 

// Ask user for bonus successes
const vWinsExtra = prompt("Bonus successes (eg, Willpower spend)?",0);

// Ask user for penalty successes
const vBotchesExtra = prompt("Opponent's successes (opposed rolls)?",0);

function RollTheDice() {

// ROLL THE DICE
// Check if counter variable is equal to vPool
// Add 1 to counter
// Generate random integar between one and ten (dice roll)
// Compare generated intergar to target number
// If intergar is equal to ten, add 2 to vWins
// If intergar is equal or more than vDiff and or equal or less than 9, add 1 to vWins
// If intergar is less than vDiff, add 1 to vFails
// If intergar is equal to one, add 1 to vBotches

function RollDice(min, max) { // min and max included

    return Math.floor(Math.random() * (max - min + 1) + min)

  }

// Repeat DiceRoll function, until counter equals vPool

		let counter = 1; // set counter to start value of 1

// Compare counter to vPool

		while (counter <= vPool) {

				counter += 1; // Increase counter counter by 1

// Generate intergar between 1-10

		let vDiceResult = RollDice(1, 10);

// Add integar to DiceRollsArray array

	  DiceRollsArray.push(vDiceResult);

	// if intergar equals 1, increase vBotches variable by 1

		if (vDiceResult == 1) {

 		  vBotches++;

	// if intergar equals 10, increase vWins variable by 2

	} else if (vDiceResult == 10) {

	  vWins++;
    vWins++;

	// if intergar is between vDiff value and 9, increase vWins variable by 1

	} else if (vDiceResult >= vDiff && vDiceResult <= 9) {

		vWins++;

	// if intergar is between 2 and vDiff value, increase vFails variable by 1

	} else if (vDiceResult >= 2 && vDiceResult < vDiff) {

		vFails++;

		}

}

}

function CountResults() {

// CALCULATE SUCCESS OR FAILURE

	let AllWins = parseInt(vWins) + parseInt(vWinsExtra);

	let AllBotches = parseInt(vBotches) + parseInt(vBotchesExtra);

	vCalc = parseInt(AllWins) - parseInt(AllBotches);

	  if (vWins == 0 && vBotches >= 1) {

    vFinal = "BOTCHED"; 

  } else if (vCalc >= 1) {

  	vFinal = "SUCCESS";

  } else if (vCalc <= 0) {

		vFinal = "FAILED";

	}

}

function ShowResults() {

// DISPLAY RESULTS - WORKING OK

// display in console
// console.log("Final result: " + vFinal);
// console.log("No. dice rolled: " + vPool);
// console.log("Difficulty: " + vDiff);
// console.log("Dice rolls: " + DiceRollsArray);
// console.log("Fails rolled: " + vFails);
// console.log("Successes rolled: " + vWins);
// console.log("Bonus successes: " + vWinsExtra);
// console.log("Botches rolled: " + vBotches);
// console.log("Opponent's successes: " + vBotchesExtra);
// console.log("All successes = " + AllWins);
// console.log("All botches = " + AllBotches);
// console.log("Success minus Fails = " + vCalc);
// console.log("Total successes: " + AllWins);
// console.log("Total botches: " + AllBotches);


// Send results to HTML window

if (vCalc >= 1) {
document.getElementById("Result").innerHTML = "Result: " + vFinal + " with " + vCalc + " successes";

} else if (vCalc == 1) {

document.getElementById("Result").innerHTML = "Result: " + vFinal + " with 1 success";

} else if (vWins == 0 && vBotches >= 1) {

document.getElementById("Result").innerHTML = "Result: " + vFinal;

} else if (vFinal == "FAILED") {

document.getElementById("Result").innerHTML = "Result: " + vFinal + " by " + vCalc + " botches";

}

// document.getElementById("Result").innerHTML = "Result: " + vFinal;
document.getElementById("DiceRolled").innerHTML = "Dice pool: " + vPool;
document.getElementById("Difficulty").innerHTML = "Difficulty: " + vDiff;
document.getElementById("Rolls").innerHTML = "Roll resuls: " + DiceRollsArray;
document.getElementById("Successes").innerHTML = "Successes: " + vWins;
document.getElementById("Fails").innerHTML = "Fails: " + vFails;
document.getElementById("Botches").innerHTML = "Botches: " + vBotches;

// break down of all successes and all fails
// document.getElementById("FinalResult").innerHTML = "(" + vWins + " successes plus " + vWinsExtra + " bonus successes)" + " minus " + "(" + vBotches + " botches and " + vBotchesExtra + " opposing successes) = " + vCalc; 


}

RollTheDice();
CountResults();
ShowResults();
