function RollSoak() {
    // WORKING
    // Damage soak function

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra
    DiceRollsArray = [];
    vDiff = Number(6);
    vWins = Number(0); // number of rolls equal or more than target
    vFails = Number(0); // number of rolls less than target
    vBotches = Number(0); // number of times "1" rolled
    vDiceResult = Number(0);
    vCalc = Number(0); // result of vWins minus vBotches
    vFinal = "Result"; // "SUCCESS", "FAIL" or "BOTCH" string
    AllWins = Number(0);
    AllBotches = Number(0);
    vWinsExtra = Number(0);
    vBotchesExtra = Number(0);

    // Set vPool variable
    DicePool = stats[2] + stats[9];
    DiceModifierUser = Number(document.getElementById("DiceModifierUser").value);
    vPool = Math.max(DicePool + DiceModifierUser, 1);

    // set roll target number, based on number in difficulty input window

    // vWinsExtra = Number(document.getElementById("UserWinsExtra").value);
    // vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    // Call dice rolling functions
    CheckDamageRoll();
    CountRollResults();
    ShowResultsSoakRoll();
}

function ShowResultsSoakRoll() {
    // WORKING
    // Send success/faiure result to HTML window

    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "none";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML =
            vCalc + " levels of damage soaked";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = "1 level of damage soaked";
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = "No damage soaked";
    }

    if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML =
            "(Including " +
            vWinsExtra +
            " bonus successes<br>" +
            "and " +
            vBotchesExtra +
            " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML =
            "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML =
            "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (DicePenaltiesTotal >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML =
            "(Including " + DicePenaltiesTotal + " bonus dice)";
    } else if (DicePenaltiesTotal <= -1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML =
            "(Including " + DicePenaltiesTotal + " penalty dice)";
    }
} // end ShowResultsSoakRoll function
