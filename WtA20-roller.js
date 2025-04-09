/* Storyteller dice roller v0.0.11-single-menu-function */

// BUG NOTES




/////////////////////// 
// FUNCTIONS -          
// WORKS IN PROGRESS
///////////////////////

//  ----GLOBAL VARIABLES---- 

var CrinosForm = "false";
var DiceModifierUser = Number(0);
var DicePenaltiesTotal = Number(0);
var DiceRollsArray = ["So roll some dice…"];
var DiffMod = Number(0);
var elem = document.documentElement;
var RageDicePool;
var RageDiff = Number(0);
var RageDiffBase = Number(0);
var RageDiffCrinosMod = Number(0);
var RageDiffRankMod = Number(0);
var RageRollSuccessTarget;
var RollType = "typeskill";
var Specialised = "false";
var vAttackType = "melee";
var vAuspice = "9999";
var vDamageType = "bashing";
var vDamageType = "bashing";
var vGauntlet = "9999";
var vHealthLevel = Number(0);
var vMoonPhase = "9999";
var vRank = Number(0);
var vDiff = Number(6);
var vFinal = "Waiting";
var vPool = Number(4);
var SelectedValue;
var SelectedMenu;



//////////////////////////////
// WORKING FUNCTIONS
//
// DO NOT CHANGE OR UPDATE
//////////////////////////////

// >>>> ON PAGE LOAD <<<< 

window.onload = function() {

    // SET VARIABLES TO DISPLAY STARTING RESULTS - RUN WHEN PAGE LOADS

    document.getElementById("Results").innerHTML = vFinal;
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("difftitle").style.visibility = "visible";
    document.getElementById("rageroll").style.display = "none";
    document.getElementById("stepsideways").style.display = "none";
    document.getElementById("damagetypeselect").style.display = "none";
    document.getElementById("ResultsWindow").style.visibility = "hidden";

}


// SINGLE MENU SELECTION FUNCTION

function MenuItemSelect(param) {
    // reset variables to clear old values
    window[NewVar] = [undefined];

    // SelectedMenu = ID of menu
    let SelectedMenu = document.getElementById(param).id;
    // el = ID of menu to run function
    let el = document.getElementById(param);
    // value = value of selected menu item
    let SelectedValue = el.querySelector("option:checked").value;
    // name for variable to store called value
    // new variable format is vMenuName
    var NewVar = `v${SelectedMenu}`;
    window[NewVar] = Number(SelectedValue);

}

// >>>> MENU LINKS <<<<

function handleSelect(elm) {
    window.location = elm.value + ".html";
}

// >>>> ROLL SETTINGS ENTRY FUNCTIONS <<<< 

// set UI depending on roll selected

function RollTypeSkill() {
    RollType = "typeskill";
    document.getElementById("ResultsWindow").style.visibility = "hidden";
    document.getElementById("HealthMenu").style.visibility = "visible";
}

function RollTypeReflex() {
    RollType = "typereflex";
    document.getElementById("ResultsWindow").style.visibility = "hidden";
    document.getElementById("HealthMenu").style.visibility = "hidden";

}

function RollTypeRage() {
    RollType = "typerage";
    document.getElementById("ResultsWindow").style.visibility = "hidden";
    document.getElementById("HealthMenu").style.visibility = "hidden";

}

function RollTypeDamage() {
    RollType = "typedamage";
    document.getElementById("ResultsWindow").style.visibility = "hidden";
    document.getElementById("HealthMenu").style.visibility = "visible";

}

function RollTypeSlip() {
    RollType = "typeslip";
    document.getElementById("ResultsWindow").style.visibility = "hidden";
    document.getElementById("HealthMenu").style.visibility = "hidden";

}

// ---- ROLL SETTING MENUS ----

function setCrinosSwitch() {
    // set CrinosForm var when checkbox used
    CrinosSwitch = document.querySelector("input[id=CrinosSwitch]");

    function CrinosSwitchCheck() {
        CrinosSwitched = CrinosSwitch.checked ? CrinosForm = "true" : CrinosForm = "false";
    }
    CrinosSwitch.onchange = CrinosSwitchCheck();

} // end setCrinosSwitch

function setSpecialisedSwitch() {
    // set Specialised var when checkbox used
    SpecialisedSwitch = document.querySelector("input[id=SpecialisedSwitch]");

    function SpecialisedSwitchCheck() {
        SpecialisedSetting = SpecialisedSwitch.checked ? Specialised = "true" : Specialised = "false";
    }
    SpecialisedSwitch.onchange = SpecialisedSwitchCheck();

} // end setSpecialisedSwitch


// Set dice pool functions

function SetDicePool() {
    // apply dice penalty taken from wound menu

    DiceModifierUser = Number(document.getElementById("DiceModifierUser").value);

    let DicePool = Number(document.getElementById("UserDice").value);

    vPool = Math.max((DicePool + DiceModifierUser), 1);

} // end SetDicePool func

function HealthDicePenalty() {
    // apply dice penalty taken from wound menu

    if (vHealthLevel >= Number(1)) {
        // return minimum dice pool of 1
        vPool = Math.max((vPool - vHealthLevel), 1);

        // console.log("vHealthLevel var is: " + vHealthLevel);
        // console.log("Adjusted vPool var is: " + vPool);

    }

} // end DicePoolHeathPenalty

// >>>> DICE ROLLING FUNCTIONS <<<<

function RollDice(min, max) {
    // Dice roll function
    // Called by check functions
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Roll() {
    // Execute dice roll functions, depending on user's radio button selection
    // "typeskill" = standard ability check
    // "typerage" = Frenzy roll (no botches or 10s)
    // "typedamage" - damage roll (no botches or 10s)
    // "typeslip" - slip sideways roll
    // RollType variable default: "typeskill"

    // Call function to define RollType variable
    // RollTypeSelect();

    // Show Results window
    document.getElementById("ResultsWindow").style.visibility = "visible";

    // Reset ResultsDisplay field
    ResetResultsDisplay();

    // Execute function, depending on RollType variable
    if (RollType == "typeskill" || RollType == "typereflex") {
        RollSkill();
    } else if (RollType == "typerage") {
        RollRage();
    } else if (RollType == "typeslip") {
        RollStepSideways();
    } else if (RollType == "typedamage") {
        RollDamage();
    } else if (RollType == undefined) {
        console.log("Roll type is not selected");
    }
}

function RollRepeat() {
    // RE-ROLL DICE WITHOUT BONUS/PENALTY SUCCESSES AND DICE

    // Reset ResultsDisplay field
    ResetResultsDisplay();

    // Reset variables, except vPool and vDiff
    DiceRollsArray = [];
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
    DiceModifierUser = Number(0);

    if (RollType == "typeskill" || RollType == "typereflex") {
        RollSkill();
    } else if (RollType == "typerage") {
        RollRage();
    } else if (RollType == "typeslip") {
        RollStepSideways();
    } else if (RollType == "typedamage") {
        RollDamage();
    } else if (RollType == undefined) {}
}

function RollRepeatAdjusted() {
    // RE-ROLL DICE WITHOUT BONUS/PENALTY SUCCESSES

    // Reset ResultsDisplay field
    ResetResultsDisplay();

    // Reset variables, except vPool, vDiff, bonus successes and bonus botches
    DiceRollsArray = [];
    vWins = Number(0); // number of rolls equal or more than target
    vFails = Number(0); // number of rolls less than target
    vBotches = Number(0); // number of times "1" rolled
    vDiceResult = Number(0);
    vCalc = Number(0); // result of vWins minus vBotches
    vFinal = "Result"; // "SUCCESS", "FAIL" or "BOTCH" string
    AllWins = Number(0);
    AllBotches = Number(0);

    if (RollType == "typeskill" || RollType == "typereflex") {
        RollSkill();
    } else if (RollType == "typerage") {
        RollRage();
    } else if (RollType == "typeslip") {
        RollStepSideways();
    } else if (RollType == "typedamage") {
        RollDamage();
    } else if (RollType == undefined) {}
}

function CountRollResults() {

    // Calculate success, failure or botch
    // Validate bonus success and extra botch user entry fields

    if (vWinsExtra == "") {
        vWinsExtra = Number(0);
    }

    if (vBotchesExtra == "") {
        vBotchesExtra = Number(0);
    }

    // Total successes and botches seperately, then find difference

    AllWins = Number(vWins) + Number(vWinsExtra);
    AllBotches = Number(vBotches) + Number(vBotchesExtra);
    vCalc = Number(AllWins) - Number(AllBotches);


    // Calculate success of failure by checking if vCalc equal or less than 0
    if (AllWins == Number(0) && vBotches >= Number(1)) {
        vFinal = "BOTCHED";

    } else if (vCalc >= Number(1)) {
        vFinal = "SUCCESS";

    } else if (vCalc <= Number(0)) {
        vFinal = "FAILED";
    }

} // end of CountResults function


// >>>> ABILITY CHECK FUNCTIONS <<<<

// ---- STANDARD ABILITY ROLL ----

function RollSkill() {
    // Roll ability check function

    // Validate DicePool and Difficulty entered, stop func if not
    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls1");
    MessageBottom.innerHTML = " ";
    let x = Number(document.getElementById("UserDice").value);
    let y = Number(document.getElementById("UserDiff").value);

    try {
        if (y == null && y == null || x == 0 && y == 0 || x == NaN && y == NaN) throw "Dice pool and difficulty needed";
        if (x == 0 || NaN) throw "Dice pool required";
        if (y == 0 || NaN) throw "Difficulty required";
        if (x >= 20) throw "That's far too many dice…";
        if (y >= 10 || y <= 2) throw "Difficulty must be between 3 and 9";

    } catch (err) {
        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra

    DiceRollsArray = [];
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

    SetDicePool();

    // Apply health level penalty to number of dice in pool, if action roll being made

    if (RollType == "typeskill") {
        HealthDicePenalty();
        DicePenaltiesTotal = (DiceModifierUser + vHealthLevel);
    } else if (RollType == "typereflex") {
        DicePenaltiesTotal = DiceModifierUser;
    }

    // set roll target number, based on number in difficulty input window
    vDiff = Number(document.getElementById("UserDiff").value);

    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);
    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    // Call dice rolling functions
    CheckSkillRoll();
    CountRollResults();
    ShowResultsSkillRoll();
}

function CheckSkillRoll() {
    // CHECK RESULTS OF DICE ROLL

    // Repeat DiceRoll function, until counter equals vPool
    let counter = 1; // set counter to start value of 1

    // Compare counter to vPool
    while (counter <= vPool) {
        // Increase counter counter by 1
        counter += 1;

        // Generate intergar between 1-10
        let vDiceResult = RollDice(1, 10);

        // Add integar to DiceRollsArray array
        DiceRollsArray.push(" " + vDiceResult);

        // if intergar equals 1, increase vBotches variable by 1
        if (vDiceResult == 1) {
            vBotches++;
        }

        // if Specialised is false
        // if intergar is 10, increase vWins variable by 2
        else if (Specialised == "false" && vDiceResult == 10) {
            vWins++;
            vWins++;
        }

        // if Specialised is true
        // if intergar is 9 or 10, increase vWins variable by 2
        else if (Specialised == "true" && vDiceResult >= 9) {
            vWins++;
            vWins++;
        }

        // if Specialised is false
        // if intergar is between vDiff value and 9, increase vWins variable by 1
        else if (vDiceResult >= vDiff && vDiceResult <= 9 && Specialised == "false") {
            vWins++;
        }

        // if intergar is between 2 and vDiff value, increase vFails variable by 1
        else if (vDiceResult >= 2 && vDiceResult < vDiff) {
            vFails++;
        }
    }

} // end SkillCheck function

function ShowResultsSkillRoll() {
    // Send success/faiure result to HTML window

    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "none";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>" + vCalc + " successes";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>1 success";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = vFinal;
    }

    if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (DicePenaltiesTotal >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + DicePenaltiesTotal + " bonus dice)";
    } else if (DicePenaltiesTotal <= -1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + DicePenaltiesTotal + " penalty dice)";
    }


} // end ShowResults function


// ---- DAMAGE ROLL ----

function RollDamage() {
    // Roll damage

    // Validate user input
    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls1");
    MessageBottom.innerHTML = "";
    let x = Number(document.getElementById("UserDice").value);
    let y = Number(document.getElementById("UserDiff").value);

    try {
        if (y == null && y == null || x == 0 && y == 0 || x == NaN && y == NaN) throw "Dice pool and difficulty needed";
        if (x == 0 || NaN) throw "Dice pool required";
        if (y == 0 || NaN) throw "Difficulty required";
        if (x >= 30) throw "That's far too many dice…";
    } catch (err) {

        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra

    DiceRollsArray = [];
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

    SetDicePool();

    // Apply health level penalty to number of dice in pool, if action roll being made

    // Select melee or gun attack type, and deactivate health penalty for latter
    
    switch (vAttackType) {
        case 1:
            vAttackType = "melee";
            break;
        case 2:
            vAttackType = "gun";
            break;
        default:
            vAttackType = "melee";
    }

    if (vAttackType == "melee") {
        HealthDicePenalty();
        DicePenaltiesTotal = (DiceModifierUser + vHealthLevel);
    } else if (vAttackType == "gun") {
        DicePenaltiesTotal = DiceModifierUser;
    }

    console.log("vAttackType var is: " + vAttackType);

    // Apply health level penalty to number of dice in pool

    vDiff = document.getElementById("UserDiff").value;

    vWinsExtra = document.getElementById("UserWinsExtra").value;
    vBotchesExtra = document.getElementById("UserBotchesExtra").value;

    CheckDamageRoll();
    CountRollResults();
    ShowResultsDamage();
}

function CheckDamageRoll() {
    // Repeat DiceRoll function, until counter equals vPool
    let counter = 1; // set counter to start value of 1

    // Compare counter to vPool
    while (counter <= vPool) {
        counter += 1; // Increase counter counter by 1

        let vDiceResult = RollDice(1, 10); // Generate intergar between 1-10

        DiceRollsArray.push(" " + vDiceResult); // Add integar to DiceRollsArray array

        if (vDiceResult >= 1 && vDiceResult < vDiff) {
            vFails++;
        } else if (vDiceResult >= vDiff && vDiceResult <= 10) {
            vWins++;
        }
    }
} // End DamageCheck function

function ShowResultsDamage() {
    // Send success/faiure result to HTML window

    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "none";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";

    switch (vDamageType) {
        case 1:
            vDamageType = "bashing";
            break;
        case 2:
            vDamageType = "lethal";
            break;
        case 3:
            vDamageType = "aggravated";
            break;
        default:
            vDamageType = "bashing";
    }

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vCalc + " levels of " + vDamageType + " damage inflicted";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = "1 level of " + vDamageType + " damage inflicted";
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = "No damage inflicted";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;
    }

    if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (DicePenaltiesTotal >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + DicePenaltiesTotal + " bonus dice)";
    } else if (DicePenaltiesTotal <= -1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + DicePenaltiesTotal + " penalty dice)";
    }

} // end ShowDamageResults function


// ---- RAGE ROLL ----

function RollRage() {
    // run rage roll functions in order

    // CHECK AUSPICE AND MOON PHASE SELECTED, STOP IF NOT

    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls1");
    MessageBottom.innerHTML = " ";
    let x = Number(vMoonPhase);
    let y = Number(vAuspice);
    let z = Number(document.getElementById("UserDice").value);

    try {
        if (x == 9999 && y == 9999) throw "Moon phase and Auspice required";
        if (x == 9999) throw "Moon phase required";
        if (y == 9999) throw "Auspice required";
        if (z == 0 || NaN) throw "Dice pool required";
    } catch (err) {
        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    DiceRollsArray = []; // array storing generated integars

    AllBotches = Number(0);
    AllWins = Number(0);
    Specialised = "false";
    vBotches = Number(0); // number of times "1" rolled
    vCalc = Number(0); // result of vWins minus vBotches
    vDiceResult = Number(0); // clears result of previous die roll
    vFails = Number(0); // number of rolls less than target
    vFinal = "null"; // "SUCCESS", "FAIL" or "BOTCH" string
    vWins = Number(0); // number of rolls equal or more than target
    vRank = Number(0); // set GarouRank value to 0 as default
    vWinsExtra = Number(0);
    vBotchesExtra = Number(0);
    vHealthLevel = Number(0);

    SetDicePool();

    DicePenaltiesTotal = DiceModifierUser;

    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);
    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    // Use when "RageDice" input is active for testing
    // RageDicePool = document.getElementById("RageDice").value;

    SetRageDiff();
    CheckRageRoll();
    ShowResultsRage();

} // end rage roll function

function SetRageDiff() {
    // Calculate difficulty for rage roll, based on auspice and moon menu selections

    // Set rage roll difficulty to moon value plus 3
    RageDiffBase = Number(vMoonPhase) + 3;

    // apply -1 bonus to rage roll difficulty, if CrinosForm switch is true, or auspice and moon phase match
    if (vAuspice != vMoonPhase) {
        RageDiffCrinosMod = Number(0);

    } else if (vAuspice == vMoonPhase) {
        RageDiffCrinosMod = Number(1);

    } else if (CrinosForm == "true") {
        RageDiffCrinosMod = Number(1);
    }

    // set rage roll rank difficulty modifier
    if (vRank >= Number(0) && vRank <= Number(2) || "") {
        RageDiffRankMod = Number(0);

    } else if (vRank == Number(3)) {
        RageDiffRankMod = Number(1);

    } else if (vRank >= Number(4) && vRank <= Number(6)) {
        RageDiffRankMod = Number(2);
    }

    // Get difficulty modifier

    let DiffMod = document.getElementById("UserDiffMod").value;
    DiffMod = Number(DiffMod);

    // Apply difficulty modifier to Rage difficulty rating

    RageDiff = Math.min(Math.max((Number(RageDiffBase) - Number(RageDiffCrinosMod)) + (Number(RageDiffRankMod) + Number(DiffMod)), 3), 9);

} // end of setRageDiff function

function CheckRageRoll() {
    // Make rage roll

    // Repeat DiceRoll function, until counter equals vPool

    // set counter to start value of 1
    let counter = 1;

    // Compare counter to vPool
    while (counter <= vPool) {

        // Increase counter counter by 1
        counter += 1;

        // Generate intergar between 1-10
        let vDiceResult = RollDice(1, 10);

        // Add integar to DiceRollsArray array
        DiceRollsArray.push(" " + vDiceResult);

        // if dice roll is between 1 and below target, add 1 to vFails
        // else if dice roll is between target and 10 add 1 to vWins

        // if intergar equals 1, increase vBotches variable by 1
        if (vDiceResult == 1) {
            vBotches++;

        } else if (vDiceResult >= 2 && vDiceResult < RageDiff) {
            vFails++;

        } else if (vDiceResult >= RageDiff && vDiceResult <= 10) {
            vWins++;

        } else if (vDiceResult = 10) {
            vWins++;
            vWins++;
        }
    }
} // End of RageCheck function

function ShowResultsRage() {
    // Calculate and display result of Rage roll

    // CALCULATE AND DISPLAY SUCCESS OR FAILURE
    // Display rage roll results in body's Results field

    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "none";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";

    // set rage roll success rank modifier

    if (vRank >= Number(0) && vRank <= Number(4)) {
        RageRollSuccessTarget = Number(4);

    } else if (vRank == Number(5)) {
        RageRollSuccessTarget = Number(5);

    } else if (vRank == Number(6)) {
        RageRollSuccessTarget = Number(6);
    }

    // Compare vWins against 4 successes needed for frenzy plus rank-based successes modifier

    if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Rolls2").style.display = "block";
        document.getElementById("Results").innerHTML = "BOTCHED";
        document.getElementById("Rolls2").innerHTML = "Loose 1 rage point";
        document.getElementById("ResultsWindow").classList.remove("frenzyred");

    } else if (Number(vWins) <= Number(RageRollSuccessTarget)) {
        document.getElementById("Rolls2").style.display = "none";
        document.getElementById("Results").innerHTML = "Calm";
        document.getElementById("ResultsWindow").classList.remove("frenzyred");

    } else if (vWins == (1 + Number(RageRollSuccessTarget))) {
        document.getElementById("Rolls2").style.display = "none";
        document.getElementById("Results").innerHTML = "FRENZY";
        document.getElementById("ResultsWindow").classList.add("frenzyred");

    } else if (vWins >= (2 + Number(RageRollSuccessTarget))) {
        document.getElementById("Rolls2").style.display = "none";
        document.getElementById("Results").innerHTML = "IN THRALL<br>OF THE WYRM";
        document.getElementById("ResultsWindow").classList.add("frenzyred");

    }

    if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Rolls3").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (DicePenaltiesTotal >= 1) {
        document.getElementById("Rolls4").style.display = "block";
        document.getElementById("Rolls4").innerHTML = "(Including " + DicePenaltiesTotal + " bonus dice)";
    } else if (DicePenaltiesTotal <= -1) {
        document.getElementById("Rolls4").style.display = "block";
        document.getElementById("Rolls4").innerHTML = "(Including " + DicePenaltiesTotal + " penalty dice)";
    }
} // end of rage result


// ---- STEP SIDEWAYS ----

function SetGauntlet() {
    // Set gauntlet for slip sideways check on menu change

    GauntletSelected = document.getElementById("GauntletMenu");
    GauntletSelected.addEventListener("change", function handleChange(event) {
        Gauntlet = Number(event.target.value);
    })
} // end gauntlet menu change function

function RollStepSideways() {

    DiceRollsArray = []; // array storing generated integars

    AllBotches = Number(0);
    AllWins = Number(0);
    Specialised = "false";
    vBotches = Number(0); // number of times "1" rolled
    vCalc = Number(0); // result of vWins minus vBotches
    vDiceResult = Number(0); // clears result of previous die roll
    vFails = Number(0); // number of rolls less than target
    vFinal = ""; // "SUCCESS", "FAIL" or "BOTCH" string
    vWins = Number(0); // number of rolls equal or more than target
    vWinsExtra = Number(0);
    vBotchesExtra = Number(0);
    vHealthLevel = Number(0);

    // TEST GAUNTLET HAS BEEN SELECTED AND STOP ROLL IF NOT
    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls1");
    MessageBottom.innerHTML = " ";
    let x = vGauntlet;
    let y = document.getElementById("UserDice").value;

    try {
        if (x == 9999) throw "Gauntlet level required";
        if (y == "" || y == "0") throw "Dice pool required";
    } catch (err) {

        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    SetDicePool();

    DicePenaltiesTotal = DiceModifierUser;

    // run gnosis roll functions in order

    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);
    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    CheckStepSidewaysRoll();
    CountRollResults();
    ShowResultsStepSideways();

} // end slip sideways roll function

function CheckStepSidewaysRoll() {
    // Calculate Step Sideways roll Result

    // Get difficulty modifier value
    let DiffMod = document.getElementById("UserDiffMod").value;
    DiffMod = Number(DiffMod);

    // Apply difficulty modifier to Gauntlet rating
    let GauntletAdjusted = Math.min(Math.max((Number(vGauntlet) + Number(DiffMod)), 3), 9);

    // Repeat DiceRoll function, until counter equals vPool

    let counter = 1; // set counter to start value of 1

    // Compare counter to vPool

    while (counter <= vPool) {
        // Increase counter counter by 1
        counter += 1;

        // Generate intergar between 1-10
        let vDiceResult = RollDice(1, 10);

        // Add integar to DiceRollsArray array
        DiceRollsArray.push(" " + vDiceResult);

        // if intergar equals 1, increase vBotches variable by 1
        if (vDiceResult == 1) {
            vBotches++;

            // if roll is 10, increase vWins variable by 2
        } else if (vDiceResult == 10) {
            vWins++;
            vWins++;

            // if roll is between Gauntlet value and 9, increase vWins variable by 1
        } else if (vDiceResult >= GauntletAdjusted && vDiceResult <= 9) {
            vWins++;
        }

        // if roll is between 2 and Gauntlet value, increase vFails variable by 1
        else if (vDiceResult >= 2 && vDiceResult < GauntletAdjusted) {
            vFails++;
        }
    }

} // end Gnosis roll function

function ShowResultsStepSideways() {
    // Display results of slip sideways roll

    // Rolls variable set to null
    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "block";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";

    if (Number(vCalc) <= Number(0)) {
        document.getElementById("Results").innerHTML = "Fail";
        document.getElementById("Rolls2").innerHTML = "1 hour wait to try again";

    } else if (Number(vCalc) == Number(1)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls2").innerHTML = "Takes 5 minutes";

    } else if (Number(vCalc) == Number(2)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls2").innerHTML = "Takes 30 seconds";

    } else if (Number(vCalc) >= Number(3)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls2").innerHTML = "Instantaneous";

    } else if (Number(vCalc) <= Number(0) && Number(vBotches) >= Number(1)) {
        document.getElementById("Rolls3").style.display = "block";
        document.getElementById("Results").innerHTML = "Botch";
        document.getElementById("Rolls2").innerHTML = "Stuck between worlds";
        document.getElementById("Rolls3").innerHTML = "loose 1 gnosis point";
    }

    if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls4").style.display = "block";
        document.getElementById("Rolls4").innerHTML = "(Including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls4").style.display = "block";
        document.getElementById("Rolls4").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls4").style.display = "block";
        document.getElementById("Rolls4").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (DicePenaltiesTotal >= 1) {
        document.getElementById("Rolls5").style.display = "block";
        document.getElementById("Rolls5").innerHTML = "(Including " + DicePenaltiesTotal + " bonus dice)";
    } else if (DicePenaltiesTotal <= -1) {
        document.getElementById("Rolls5").style.display = "block";
        document.getElementById("Rolls5").innerHTML = "(Including " + DicePenaltiesTotal + " penalty dice)";
    }


} // end slip sideways result function


// >>>> CHANGE UI FUNCTIONS <<<<

function ResetResultsDisplay() {
    DiceRollsArray = ["waiting"];
    vFinal = "Results";
    document.getElementById("Results").innerHTML = vFinal;
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").innerHTML = "";
    document.getElementById("Rolls3").innerHTML = "";
    document.getElementById("Rolls4").innerHTML = "";
    document.getElementById("ResultsWindow").classList.remove("FrenzyOverlay");

}

function uiStandard() {
    // Show Difficulty number entry field
    // Remove Rage and Step Sideways buttons
    // Use for Ability and damage rolls  
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("difftitle").style.visibility = "visible";
    document.getElementById("rageroll").style.display = "none";
    document.getElementById("stepsideways").style.display = "none";
    document.getElementById("damagetypeselect").style.display = "none";
    document.getElementById("UserWinsExtra").classList.remove("required");
    document.getElementById("SpecialisedSwitchBox").style.visibility = "visible";
    ResetResultsDisplay();

}

function uiDamage() {
    // Show Difficulty number entry field
    // Remove Rage and Step Sideways buttons
    // Show damage type menu
    // Use for Ability and damage rolls  
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("difftitle").style.visibility = "visible";
    document.getElementById("rageroll").style.display = "none";
    document.getElementById("stepsideways").style.display = "none";
    document.getElementById("damagetypeselect").style.display = "inline-block";
    document.getElementById("UserWinsExtra").classList.add("required");
    document.getElementById("SpecialisedSwitchBox").style.visibility = "hidden";
    ResetResultsDisplay();

}

function uiRage() {
    // Hide Difficulty number entry field
    // Reveal Rage buttons  
    // Remove Step Sideways buttons  
    document.getElementById("UserDiff").style.visibility = "hidden";
    document.getElementById("difftitle").style.visibility = "hidden";
    document.getElementById("rageroll").style.display = "inline-block";
    document.getElementById("stepsideways").style.display = "none";
    document.getElementById("damagetypeselect").style.display = "none";
    document.getElementById("UserWinsExtra").classList.remove("required");
    document.getElementById("SpecialisedSwitchBox").style.visibility = "hidden";
    ResetResultsDisplay();

}

function uiStepSideways() {
    // Hide Difficulty number entry field
    // Reveal Step Sideways buttons  
    // Remove Rage buttons  
    document.getElementById("UserDiff").style.visibility = "hidden";
    document.getElementById("difftitle").style.visibility = "hidden";
    document.getElementById("rageroll").style.display = "none";
    document.getElementById("stepsideways").style.display = "inline-block";
    document.getElementById("damagetypeselect").style.display = "none";
    document.getElementById("UserWinsExtra").classList.remove("required");
    document.getElementById("SpecialisedSwitchBox").style.visibility = "hidden";
    ResetResultsDisplay();

}

function ShowAllSections() {
    // console.log("all sections visible");
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("difftitle").style.visibility = "visible";
    document.getElementById("stepsideways").style.display = "block";
    document.getElementById("rageroll").style.display = "block";
    document.getElementById("damagetypeselect").style.display = "block";
}

function ResetForms() {
    // UPDATE FORM IDs WHEN LAYOUT FINALISED
    document.getElementById("RageRolls").reset();
    document.getElementById("RollSettings").reset();
    document.getElementById("stepsideways").reset();
}
