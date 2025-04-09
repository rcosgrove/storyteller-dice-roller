//Werewolf 20th Anniversary Edition Dice roller

var Fails = 0;
var Difficulty = 6;
var DiceNo = 1;
var OppSuccesses = 0;
var Successes = 0;
var Botches = 0;
var DiceResult;
var FinalResult;
var Botches = 0;
var CriticalRolls = 0;
var DiceRollsArray = [];
var Difficulty = prompt("Difficulty (default 6):");
var DiceNo = prompt("No. dice to roll (default 1):");
var Critical = prompt("Reroll on 9 or 10? (enter 9 or 10)");
var OppSuccesses = prompt("Opponent's successes (default 0):");
//Roll dice
//Check no. dice to be rolled, and roll if needed
while ((DiceNo > 0)) {
  //Roll a d10
  DiceResult = Math.floor(Math.random() * 10) + 1;
  //Add result to dice rolls array
  DiceRollsArray.push(DiceResult);
  if (Critical == 9 && DiceResult >= 9) {
    CriticalRolls = CriticalRolls + 1;
    Successes = Successes + 2;
  } else if ((Critical == 10 && DiceResult == 10)) {
    CriticalRolls = CriticalRolls + 1;
    Successes = Successes + 2;
  } else if ((DiceResult == 1)) {
    Botches = Botches + 1;
  } else if ((DiceResult >= 2 && DiceResult < Difficulty)) {
    Fails = Fails + 1;
  } else {
    Successes = Successes + 1;
  }
  //One less dice to be rolled
  DiceNo = DiceNo - 1;
}
//Display successes
if (Successes == 0 && Botches >= 0) {
  //Display a normal failure was rolled
  console.log("Failed");
  FinalResult = "Failed";
  document.write(FinalResult);
} else if ((Successes == 0 && Botches == 1)) {
  //Display a botch was rolled
  console.log("BOTCH!");
  FinalResult = "Botch";
  document.write(FinalResult);
} else {
  //Sum 1s rolled and opponent's successes
  var FinalBotches = Botches + OppSuccesses;
  //Remove 1s and opponent's successes from successes rolled
  var FinalResult = Successes - FinalBotches;
  //Display the final result of the roll
  if (FinalResult <= 0) {
    console.log("Failed");
    document.write("Failed");
    document.write("\n");
  } else if ((FinalResult == 1)) {
    console.log("1 success");
    document.write("1 success");
    document.write("\n");
  } else {
    console.log("Total successes");
    console.log(FinalResult);
    document.write("Success with " + FinalResult + " successes");
    document.write("\n");
  }
//  removeItem(DiceRollsArray, 0);
  if (Critical == 9) {
    console.log("What the dice rolled (9s are crits)");
    document.write("What the dice rolled (9s are crits)");
    document.write("\n");
  } else {
    console.log("What the dice rolled (10s are crits)");
    document.write("What the dice rolled (10s are crits)");
    document.write("\n");
  }
  console.log(DiceRollsArray);
  console.log("Criticals");
  console.log(CriticalRolls);
  console.log("Botches");
  console.log(Botches);
  document.write("Criticals " + CriticalRolls +);
    document.write("\n");
  document.write("Botches " + Botches +);
    document.write("\n");

}
