// STORYTELLER DICE ROLLER v0.0.9

//  ----GLOBAL VARIABLES---- 
//  
//  TO DO - check variables are valid and in use
//  TO DO - add default settings 
var AuspiceSetting = "9999";
var CrinosForm = "false";
var DamageSelected = "bashing";
var DamageType = "bashing";
var DiceRollsArray = ["So roll some dice…"];
var DiffMod = Number(0);
var GarouRank = Number(0);
var Gauntlet = "9999";
var HealthPenalty = Number(0);
var MoonSetting = "9999";
var RageDicePool;
var RageDiff = Number(0);
var RageDiffBase = Number(0);
var RageDiffCrinosMod = Number(0);
var RageDiffRankMod = Number(0);
var RageRollSuccessTarget;
var RollType = "typeskill";
var Specialised = "false";
var vDiff = Number(6);
var vFinal = "Waiting";
var vPool = Number(4);

/////////////////////// 
//                      
// FUNCTIONS -          
// WORKS IN PROGRESS
//                          
///////////////////////

//////////////////////////////
// WORKING FUNCTIONS
//
// DO NOT CHANGE OR UPDATE
//////////////////////////////

// >>>> ON PAGE LOAD <<<< 

window.onload = function() {
    // SET VARIABLES TO DISPLAY STARTING RESULTS - RUN WHEN PAGE LOADS

    document.getElementById("Results").innerHTML = vFinal;
    document.getElementById("Rolls").innerHTML = DiceRollsArray;
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("difftitle").style.visibility = "visible";
    document.getElementById("rageroll").style.display = "none";
    document.getElementById("stepsideways").style.display = "none";
    document.getElementById("damagetypeselect").style.display = "none";
    document.getElementById("ResultsWindow").style.visibility = "hidden";    
}


// >>>> MENU LINKS <<<<

function handleSelect(elm) {
    window.location = elm.value + ".html";
}


// >>>> ROLL SETTINGS ENTRY FUNCTIONS <<<< 

function RollTypeSkill() {
    RollType = "typeskill";
    document.getElementById("ResultsWindow").style.visibility = "hidden";    

}

function RollTypeRage() {
    RollType = "typerage";
    document.getElementById("ResultsWindow").style.visibility = "hidden";    

}

function RollTypeDamage() {
    RollType = "typedamage";
    document.getElementById("ResultsWindow").style.visibility = "hidden";    

}

function RollTypeSlip() {
    RollType = "typeslip";
    document.getElementById("ResultsWindow").style.visibility = "hidden";    

}

// ---- ROLL SETTING MENUS ----

function SetDamageType() {
    // Set GaruoRank on menu change
    DamageTypeSelected = document.getElementById("DamageTypeMenu");
    DamageTypeSelected.addEventListener("change", function handleChange(event) {
        DamageSelected = event.target.value;
    })
} // End SetGarouRank

function SetHealthPenalty() {
    // Set HealthPenalty global variable on menu change

    let HealthPenaltySelected = document.getElementById("HealthLevelMenu");
    HealthPenaltySelected.addEventListener("change", function handleChange(event) {
        HealthPenalty = Number(event.target.value);
    })


} // end SetHealthPenalty

function SetGarouRank() {
    // Set GaruoRank on menu change
    GarouRankSelected = document.getElementById("GarouRankMenu");
    GarouRankSelected.addEventListener("change", function handleChange(event) {
        GarouRank = Number(event.target.value);
    })
} // End SetGarouRank

function SetMoonPhase() {
    // Set MoonSetting global variable on menu change
    let MoonSettingSelected = document.getElementById("MoonPhaseMenu");
    MoonSettingSelected.addEventListener("change", function handleChange(event) {
        MoonSetting = Number(event.target.value);
    })
} // end SetMoonPhase

function SetAuspice() {
    // Set Auspice global variable on menu change
    AuspiceSettingSelected = document.getElementById("AuspiceMenu");
    AuspiceSettingSelected.addEventListener("change", function handleChange(event) {
        AuspiceSetting = Number(event.target.value);
    })
} // end SetAuspice

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

function DicePoolHealthPenalty() {
    // apply dice penalty taken from wound menu

    if (HealthPenalty => Number(1)) {
        // return minimum dice pool of 1
        vPool = Math.max((vPool - HealthPenalty), 1);
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
    if (RollType == "typeskill") {
        RollSkill();
    } else if (RollType == "typerage") {
        RollRage();
    } else if (RollType == "typeslip") {
        RollStepSideways();
    } else if (RollType == "typedamage") {
        RollDamage();
    } else if (RollType == undefined) {
        console.log("Rolltype is not selected");
    }
}

function RollRepeat() {
    // RE-ROLL DICE WITHOUT BONUS/PENALTY SUCCESSES
    
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

    if (RollType == "typeskill") {
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

    if (RollType == "typeskill") {
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
    let MessageBottom = document.getElementById("Rolls");
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


    // Set dice roll variables to user's entries
    vPool = Number(document.getElementById("UserDice").value);

    // Apply health level penalty to number of dice in pool
    DicePoolHealthPenalty();

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

    if (vBotchesExtra == 0 && vWinsExtra == 0) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
    } else if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (HealthPenalty >= 1) {
        document.getElementById("Rolls3").innerHTML = "(–" + HealthPenalty + " dice health penalty applied)";
    }

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>" + vCalc + " successes";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>1 success";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = vFinal;
    }
} // end ShowResults function


// ---- DAMAGE ROLL ----

function RollDamage() {
    // Roll damage

    // Validate user input
    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls");
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

    // Set dice roll variables to user"s entries

    vPool = Number(document.getElementById("UserDice").value);

    // Apply health level penalty to number of dice in pool

    DicePoolHealthPenalty();

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

    document.getElementById("Rolls").innerHTML = DiceRollsArray;

    if (vBotchesExtra == 0 && vWinsExtra == 0) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
    } else if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (HealthPenalty >= 1) {
        document.getElementById("Rolls3").innerHTML = "(–" + HealthPenalty + " dice health penalty applied)";
    }

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vCalc + " levels of " + DamageSelected + " damage inflicted";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = "1 level of " + DamageSelected + " damage inflicted";
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = "No damage inflicted";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;
    }
} // end ShowDamageResults function


// ---- RAGE ROLL ----

function RollRage() {
    // run rage roll functions in order

    // CHECK AUSPICE AND MOON PHASE SELECTED, STOP IF NOT

    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls");
    MessageBottom.innerHTML = " ";
    let x = Number(MoonSetting);
    let y = Number(AuspiceSetting);
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
    GarouRank = Number(0); // set GarouRank value to 0 as default
    vWinsExtra = Number(0);
    vBotchesExtra = Number(0);

    vPool = Number(document.getElementById("UserDice").value);

    // Apply health level penalty to number of dice in pool
    DicePoolHealthPenalty();

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
    RageDiffBase = Number(MoonSetting) + 3;

    // apply -1 bonus to rage roll difficulty, if CrinosForm switch is true, or auspice and moon phase match
    if (AuspiceSetting != MoonSetting) {
        RageDiffCrinosMod = Number(0);

    } else if (AuspiceSetting == MoonSetting) {
        RageDiffCrinosMod = Number(1);

    } else if (CrinosForm == "true") {
        RageDiffCrinosMod = Number(1);
    }

    // set rage roll rank difficulty modifier
    if (GarouRank >= Number(0) && GarouRank <= Number(2) || "") {
        RageDiffRankMod = Number(0);

    } else if (GarouRank == Number(3)) {
        RageDiffRankMod = Number(1);

    } else if (GarouRank >= Number(4) && GarouRank <= Number(6)) {
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

    document.getElementById("Rolls").innerHTML = DiceRollsArray;

    // set rage roll success rank modifier

    if (GarouRank >= Number(0) && GarouRank <= Number(4)) {
        RageRollSuccessTarget = Number(4);

    } else if (GarouRank == Number(5)) {
        RageRollSuccessTarget = Number(5);

    } else if (GarouRank == Number(6)) {
        RageRollSuccessTarget = Number(6);
    }

    // Compare vWins against 4 successes needed for frenzy plus rank-based successes modifier


    if (vBotchesExtra == 0 && vWinsExtra == 0) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
    } else if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (HealthPenalty >= 1) {
        document.getElementById("Rolls3").innerHTML = "(–" + HealthPenalty + " dice health penalty applied)";
    }

    if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = "BOTCHED:<br>Loose 1 rage";
        document.getElementById("Rolls").innerHTML = DiceRollsArray;

    } else if (Number(vWins) <= Number(RageRollSuccessTarget)) {
        document.getElementById("Results").innerHTML = "Calm";
        document.getElementById("Rolls").innerHTML = DiceRollsArray;

    } else if (vWins == (1 + Number(RageRollSuccessTarget))) {
        document.getElementById("Results").innerHTML = "FRENZY";
        document.getElementById("Rolls").innerHTML = DiceRollsArray;

    } else if (vWins >= (2 + Number(RageRollSuccessTarget))) {
        document.getElementById("Results").innerHTML = "IN THRALL<br>OF THE WYRM";
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
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

    // TEST GAUNTLET HAS BEEN SELECTED AND STOP ROLL IF NOT
    let MessageResults = document.getElementById("Results");
    MessageResults.innerHTML = "";
    let MessageBottom = document.getElementById("Rolls");
    MessageBottom.innerHTML = " ";
    let x = Gauntlet;
    let y = document.getElementById("UserDice").value;

    try {
        if (x == 9999) throw "Gauntlet level required";
        if (y == "" || y == "0") throw "Dice pool required";
    } catch (err) {

        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    vPool = Number(document.getElementById("UserDice").value);

    DicePoolHealthPenalty();

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
    let GauntletAdjusted = Math.min(Math.max((Number(Gauntlet) + Number(DiffMod)), 3), 9);

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

    if (vBotchesExtra == 0 && vWinsExtra == 0) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
    } else if (vBotchesExtra >= 1 && vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(including " + vWinsExtra + " bonus successes<br>" + "and " + vBotchesExtra + " automatic botches)";
    } else if (vWinsExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vWinsExtra + " bonus successes)";
    } else if (vBotchesExtra >= 1) {
        document.getElementById("Rolls").innerHTML = DiceRollsArray;
        document.getElementById("Rolls2").innerHTML = "(Including " + vBotchesExtra + " automatic botches)";
    }

    if (HealthPenalty >= 1) {
        document.getElementById("Rolls3").innerHTML = "(–" + HealthPenalty + " dice health penalty applied)";
    }

    if (Number(vCalc) <= Number(0)) {
        document.getElementById("Results").innerHTML = "Fail";
        document.getElementById("Rolls").innerHTML = [DiceRollsArray];
        document.getElementById("Rolls4").innerHTML = "1 hour wait to try again";

    } else if (Number(vCalc) == Number(1)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = [DiceRollsArray];
        document.getElementById("Rolls4").innerHTML = "Takes 5 minutes";

    } else if (Number(vCalc) == Number(2)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = [DiceRollsArray];
        document.getElementById("Rolls4").innerHTML = "Takes 30 seconds";

    } else if (Number(vCalc) >= Number(3)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = [DiceRollsArray];
        document.getElementById("Rolls4").innerHTML = "Instantaneous";

    } else if (Number(vCalc) <= Number(0) && Number(vBotches) >= Number(1)) {
        document.getElementById("Results").innerHTML = "Botch";
        document.getElementById("Rolls").innerHTML = [DiceRollsArray];
        document.getElementById("Rolls4").innerHTML = "Stuck between worlds";
    }
} // end slip sideways result function


// >>>> CHANGE UI FUNCTIONS <<<<

function ResetResultsDisplay() {
    DiceRollsArray = ["waiting"];
    vFinal = "Results";
    document.getElementById("Results").innerHTML = vFinal;
    document.getElementById("Rolls").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").innerHTML = "";
    document.getElementById("Rolls3").innerHTML = "";
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
    console.log("all sections visible");
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


////////////////
//
// DEBUGGING
//
////////////////


// ---- RESET CONTROLS ----
/*
function ResetRadioButtons() {
    // Clear all radio buttons

    let ele = document.querySelectorAll(".RadioEntry");
    for (let i = 0; i < ele.length; i++)
        ele[i].checked = false;

} // end clear radio buttons func

*/

/*

function ResetCheckboxes() {
    // reset checkboxes to false

    // document.getElementById("CrinosSwitch").checked = "true";
    // document.getElementById("DamageSwitch").checked = "true";
    // document.getElementById("SpecialisedSwitch").checked = "true";

    let inputs = document.querySelectorAll(".switch");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = true;
    }

    function ResetCrinosSwitch() {
    // reset Crinos checkbox to false
    document.getElementById("CrinosSwitch").checked = "false";
}
*/

/*
    function ResetVariables() {
    // RESET VARIABLES TO BASE AMOUNTS  
    // TO DO - check all variables to be reset present and at correct values

    DiceRollsArray = ["waiting"]; // array storing generated integars

    AllBotches = Number(0);
    AllWins = Number(0);
    CrinosForm = "false";
    GarouRankRageDiffMod = Number(0);
    HealthPenalty = Number(0);
    RageDiff = Number(0);
    RageDiffBase = Number(0);
    RollingDamage = "false";
    Specialised = "false";
    vBotches = Number(0); // number of times "1" rolled
    vCalc = Number(0); // result of vWins minus vBotches
    vDiceResult = Number(0); // clears result of previous die roll
    vFails = Number(0); // number of rolls less than target
    vFinal = "null"; // "SUCCESS", "FAIL" or "BOTCH" string
    vWins = Number(0); // number of rolls equal or more than target
    Gauntlet = Number(0);
}
*/


// >>>>> TESTING: CONSOLE.LOG FEEDBACK FUNCTIONS <<<<

/*function RollSkill1() {
    console.log("*-*-* TEST RollSkill RAN *-*-*");
    console.log("-----------------------------");
}
*/

/*
function RollDamage1() {
    console.log("*-*-* TEST RollDamage RAN *-*-*");
    console.log("-----------------------------");
}
*/
/*
function RollRage1() {
    console.log("*-*-* TEST RollRage RAN *-*-*");
    console.log("-----------------------------");
}
*/
/*
function RollStepSideways1() {
    console.log("*-*-* TEST RollStepSideways RAN *-*-*");
    console.log("-----------------------------");
}
*/
/*
function TestFunc1() {
    console.log("*-*-* TEST FUNCTION 1 RAN *-*-*");
    console.log("-----------------------------");
    console.log("");
}
*/
/*
function TestFunc2() {
    console.log("*-*-* TEST FUNCTION 2 RAN *-*-*");
    console.log("-----------------------------");
    console.log("");
}
*/
/*
function TestFunc3() {
    console.log("*-*-* TEST FUNCTION 3 RAN *-*-*");
    console.log("-----------------------------");
    console.log("");
}*/
/*
function TestFunc4() {
    console.log("*-*-* TEST FUNCTION 4 RAN *-*-*");
    console.log("-----------------------------");
    console.log("");
}*/


/*
function clicked() {
    console.log("**** A button was clicked ****");
}*/

// ---- Variable showing final calculation in words ----
// let FullResult = "(" + vWins + " successes plus " + vWinsExtra + " automatic successes) MINUS (" + vBotches + " botches plus " + vBotchesExtra + " penalty botches) = " + vCalc + " successes."

// ----Show variables in console----
// console.log("NAME variable is " + VarName);
// console.log("NAME variable is " + VarName.value);

// ----Show variables in HTML window----
//  document.getElementById("ELEMENTID").innerHTML = VARIABLE;