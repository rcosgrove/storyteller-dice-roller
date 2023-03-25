//  ----GLOBAL VARIABLES---- 
//  
//  TO DO - check variables are valid and in use
//  TO DO - add default settings 
var DiceRollsArray = ["no roll made"];
var AuspiceSetting = 9999;
var CrinosForm = "false";
var GarouRank;
var HealthPenalty = Number(0);
var MoonSetting = 9999;
var RageDicePool;
var RageDiff = Number(0);
var RageDiffBase = Number(0);
var RageDiffCrinosMod = Number(0);
var RageDiffRankMod = Number(0);
var RageRollSuccessTarget;
var Specialised = "false";
var SpecialisedSwitch = "false";
var vDiff;
var vPool;
var Gauntlet = 9999;
var RollType = "skill";
//var RollingStepSideways = "false";
//var RollingRage = "false";
//var RollingSkill = "true";
//var RollingDamage = "false";
//var RollType = "skill";
//var UserDiffMod;
var vFinal = "Result";


/////////////////////// 
//                      
// FUNCTIONS -          
// WORKS IN PROGRESS
//                          
///////////////////////

function ResetForms() {
    // UPDATE FORM IDs WHEN LAYOUT FINALISED

    document.getElementById("RageRolls").reset();
    document.getElementById("RollSettings").reset();
    document.getElementById("gnosis").reset();
}

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




////////////////////////
//
// FUNCTIONS -
// UNUSED
//                               
////////////////////////

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

//////////////////////////////
// WORKING FUNCTIONS
//
// DO NOT CHANGE OR UPDATE
//////////////////////////////

// >>>> ON PAGE LOAD <<<< 

window.onload = function() {
    // SET VARIABLES TO DISPLAY STARTING RESULTS - RUN WHEN PAGE LOADS

    vFinal = "Roll result";
    DiceRollsArray = ["waiting"];
    document.getElementById("Results").innerHTML = vFinal;
    document.getElementById("Rolls").innerHTML = DiceRollsArray;

    // window.addEventListener("load", ResetCheckboxes(), false);
    window.addEventListener("load", RollTypeSelect(), false);

}


// >>>> ROLL SETTINGS ENTRY FUNCTIONS <<<< 

// ---- RADIO BUTTON CONTROLS ----

function RollTypeSelect() {
// Automatically change RollType variable when radio buttons clicked

    if (document.querySelector("input[name='RollType']")) {
        document.querySelectorAll("input[name='RollType']").forEach((elem) => {
            elem.addEventListener("click", function(event) {
                RollType = event.target.value; }) });

        console.log("RollType variable is: " + RollType);

        let difficultysec = document.getElementById("UserDiff");
        let ragesec = document.getElementById("rageroll");
        let stepsidesec = document.getElementById("stepsideways");

        switch(RollType) {
        case "skill":
        case "damage":
            difficultysec.classList.remove("invisible");
            ragesec.classList.add("hide");
            stepsidesec.classList.add("hide");
            break;
        case "rage":
            difficultysec.classList.add("invisible");
            ragesec.classList.remove("hide");
            stepsidesec.classList.add("hide");
            break;
        case "slip":
            difficultysec.classList.add("invisible");
            ragesec.classList.add("hide");
            stepsidesec.classList.remove("hide");
        }
    }
}

/*function ToggleUserDiff() {
    console.log("Difficulty input hidden");
    // document.getElementById("UserDiff").style.visibility = "hidden";
    
    let difficultysec = document.getElementById("UserDiff");
    difficultysec.classList.toggle("invisible");

}

function ToggleRageSection() {
    console.log("rageroll section hidden");
    // document.getElementById("rageroll").style.display = "none";

    let ragesec = document.getElementById("rageroll");
    ragesec.classList.toggle("hide");
}

function ToggleStepSideSection() {
    console.log("stepsideways section hidden");
    // document.getElementById("stepsideways").style.display = "none";

    let stepsidesec = document.getElementById("stepsideways");
    stepsidesec.classList.toggle("hide");

}

function ShowUserDiff() {
    console.log("Difficulty input visible");
    document.getElementById("UserDiff").style.visibility = "visible";

}

function ShowRageSection() {
    console.log("rageroll section visible");
    document.getElementById("rageroll").style.display = "block";

}

function ShowStepSideSection() {
    console.log("stepsideways section visible");
    document.getElementById("stepsideways").style.display = "block";

}
*/
function ShowAllSections() {
    console.log("all sections visible");
    document.getElementById("stepsideways").style.display = "block";
    document.getElementById("UserDiff").style.visibility = "visible";
    document.getElementById("rageroll").style.display = "block";

}


function ResetRadioButtons() {
    // Clear all radio buttons

    let ele = document.querySelectorAll(".RadioEntry");
    for (let i = 0; i < ele.length; i++)
        ele[i].checked = false;

} // end clear radio buttons func


// ---- ROLL SETTING MENUS ----

function SetHealthPenalty() {
    // Set HealthPenalty global variable on menu change
       
    let HealthPenaltySelected = document.getElementById("HealthLevelMenu");
    HealthPenaltySelected.addEventListener("change", function handleChange(event) {
        HealthPenalty = Number(event.target.value); })
} // end SetHealthPenalty

function SetGarouRank() {
    // Set GaruoRank on menu change
    GarouRankSelected = document.getElementById("GarouRankMenu");
    GarouRankSelected.addEventListener("change", function handleChange(event) {
        GarouRank = Number(event.target.value); })
} // End SetGarouRank

function SetMoonPhase() {
    // Set MoonSetting global variable on menu change
    let MoonSettingSelected = document.getElementById("MoonPhaseMenu");
    MoonSettingSelected.addEventListener("change", function handleChange(event) {
        MoonSetting = Number(event.target.value); })
    } // end SetMoonPhase

function SetAuspice() {
    // Set Auspice global variable on menu change
    AuspiceSettingSelected = document.getElementById("AuspiceMenu");
    AuspiceSettingSelected.addEventListener("change", function handleChange(event) {
        AuspiceSetting = Number(event.target.value); })
} // end SetAuspice

function setCrinosSwitch() {
    // set CrinosForm var when checkbox used
    CrinosSwitch = document.querySelector("input[id=CrinosSwitch]");

    function CrinosSwitchCheck() {
        let CrinosSwitched = CrinosSwitch.checked ? CrinosForm = "true" : CrinosForm = "false";
    }
    CrinosSwitch.onchange = CrinosSwitchCheck();
    } // end setCrinosSwitch

function setSpecialisedSwitch() {
    // set Specialised var when checkbox used
    // SpecialisedSwitch = document.querySelector("input[id=SpecialisedSwitch]");

    function SpecialisedSwitchCheck() {
        let SpecialisedSetting = SpecialisedSwitch.checked ? Specialised = "true" : Specialised = "false";
    }
    SpecialisedSwitch.onchange = SpecialisedSwitchCheck();
    } // end setSpecialisedSwitch

function setDamageSwitch() {
    // set RollingDamage var when checkbox used
    DamageSwitch = document.querySelector("input[id=DamageSwitch]");
    function DamageSwitchCheck() {
        let DamageSetting = DamageSwitch.checked ? RollingDamage = "true" : RollingDamage = "false";
    }
    DamageSwitch.onchange = DamageSwitchCheck();
    } // end SetDamageSwitch

function DicePoolHealthPenalty() {
    // apply dice penalty taken from wound menu
    // disabled for Rage roll checks
     
    if (HealthPenalty => Number(1)) {
        // return minimum dice pool of 1
        vPool = Math.max((vPool - HealthPenalty), 1); }
} // end DicePoolHeathPenalty


// >>>> DICE ROLLING FUNCTIONS <<<<

function RollDice(min, max) {
console.log(">>>> ROLLDICE() FUNCTION <<<<")

    // Dice roll function
    // Called by check functions
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Roll() {

console.log(">>>> ROLL() FUNCTION <<<<")

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

    // Execute dice roll functions, depending on user's radio button selection
    // "skill" = standard ability check
    // "rage" = Frenzy roll (no botches or 10s)
    // "damage" - damage roll (no botches or 10s)
    // "slip" - slip sideways roll
    // RollType variable default: "skill"
    
    // Call function to define RollType variable
    RollTypeSelect();

    // Execute function, depending on RollType variable
    if (RollType == "skill") {
        RollSkill();
    } else if (RollType == "rage") {
        RollRage();
    } else if (RollType == "slip") {
        RollStepSideways();
    } else if (RollType == "damage") {
        RollingDamage = "true";
        RollDamage();
    } else if (RollType == undefined) {
    }
}
 
function RollRepeat() {    
    // RE-ROLL DICE WITHOUT BONUS/PENALTY SUCCESSES

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

    if (RollType == "skill") {
        RollSkill();
    } else if (RollType == "rage") {
        RollRage();
    } else if (RollType == "slip") {
        RollStepSideways();
    } else if (RollType == "damage") {
        RollingDamage = "true";
        RollDamage();
    } else if (RollType == undefined) {}
}

function RollRepeatAdjusted() {
    // RE-ROLL DICE WITHOUT BONUS/PENALTY SUCCESSES
    
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

    if (RollType == "skill") {
        RollSkill();
    } else if (RollType == "rage") {
        RollRage();
    } else if (RollType == "slip") {
        RollStepSideways();
    } else if (RollType == "damage") {
        RollingDamage = "true";
        RollDamage();
    } else if (RollType == undefined) {}
}
 
function CountRollResults() {
console.log(">>>> CountRollResults() FUNCTION <<<<")

    // Calculate success, failure or botch
    // Validate bonus success and extra botch user entry fields

    if (vWinsExtra == undefined) {
        vWinsExtra = Number(0);
    }

    if (vBotchesExtra == undefined) {
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
console.log(">>>> RollSkill() FUNCTION <<<<")

    // Roll ability check function
    RollingStepSideways = "false";
    RollingRage = "false";
    RollingSkill = "true";
    RollingDamage = "false";

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
    RollingSkill = "true";
    RollingStepSideways = "false";
    RollingRage = "false";
    RollingDamage = "false";
    UserWinsExtra = Number(0);
    UserBotchesExtra = Number(0);



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
console.log(">>>> CheckSkillRoll() FUNCTION <<<<")

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
console.log(">>>> ShowResultsSkillRoll() FUNCTION <<<<")

    // Send success/faiure result to HTML window

    document.getElementById("Rolls").innerHTML = DiceRollsArray;

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>" + vCalc + " successes";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = vFinal + " with<br>1 success";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = vFinal + " by " + vCalc;
    }
} // end ShowResults function






// ---- DAMAGE ROLL ----

function RollDamage() {   
    // Roll ability check function

    RollingStepSideways = "false";
    RollingRage = "false";
    RollingSkill = "false";
    RollingDamage = "true";

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra

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
        if (x >= 30) throw "That's far too many dice…";
    } catch (err) {

        MessageResults.innerHTML = err;
        MessageBottom.innerHTML = " ";
        return false;
    }

    DiceRollsArray = [];
    vWins = Number(0); // number of rolls equal or more than target
    vFails = Number(0); // number of rolls less than target
    vBotches = Number(0); // number of times "1" rolled
    vDiceResult = Number(0);
    vCalc = Number(0); // result of vWins minus vBotches
    vFinal = "Result"; // "SUCCESS", "FAIL" or "BOTCH" string
    AllWins = Number(0);
    AllBotches = Number(0);
    UserWinsExtra = Number(0);
    UserBotchesExtra = Number(0);

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
            vWins++; } }
} // End DamageCheck function

function ShowResultsDamage() {
    // Send success/faiure result to HTML window

    document.getElementById("Rolls").innerHTML = DiceRollsArray;

    if (vCalc >= 2) {
        document.getElementById("Results").innerHTML = vCalc + " levels of damage inflicted";
    } else if (vCalc == 1) {
        document.getElementById("Results").innerHTML = "1 level of damage inflicted";
    } else if (vFinal == "FAILED") {
        document.getElementById("Results").innerHTML = "No damage inflicted";
    } else if (vWins == Number(0) && vBotches >= 1) {
        document.getElementById("Results").innerHTML = vFinal;

} } // end ShowDamageResults function

// ---- RAGE ROLL ----

function RollRage() {
    // run rage roll functions in order

    RollingStepSideways = "false";
    RollingRage = "true";
    RollingSkill = "false";
    RollingDamage = "false";

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
    HealthPenalty = Number(0);
    RollingDamage = "false";
    Specialised = "false";
    vBotches = Number(0); // number of times "1" rolled
    vCalc = Number(0); // result of vWins minus vBotches
    vDiceResult = Number(0); // clears result of previous die roll
    vFails = Number(0); // number of rolls less than target
    vFinal = "null"; // "SUCCESS", "FAIL" or "BOTCH" string
    vWins = Number(0); // number of rolls equal or more than target
    GarouRank = Number(0); // set GarouRank value to 0 as default
    UserWinsExtra = Number(0);
    UserBotchesExtra = Number(0);

    RageDicePool = document.getElementById("UserDice").value;

    // Use when "RageDice" input is active for testing
    // RageDicePool = document.getElementById("RageDice").value;

    SetRageDiff();
    CheckRageRoll();
    ResultRageRoll();

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
    while (counter <= RageDicePool) {

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

function ResultRageRoll() {
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
 
    RollingStepSideways = "true";
    RollingRage = "false";
    RollingSkill = "false";
    RollingDamage = "false";

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
    UserWinsExtra = Number(0);
    UserBotchesExtra = Number(0);

    // run gnosis roll functions in order

    CheckStepSidewaysRoll();
    ResultStepSidewaysRoll();

} // end slip sideways roll function

function CheckStepSidewaysRoll() {
    // Calculate Step Sideways roll Result

    RollingStepSideways = "true";
    RollingRage = "false";
    RollingSkill = "false";
    RollingDamage = "false";

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

function ResultStepSidewaysRoll() {
    // Display results of slip sideways roll
    // Rolls variable set to null

    if (Number(vWins) <= Number(0)) {
        document.getElementById("Results").innerHTML = "Fail";
        document.getElementById("Rolls").innerHTML = "1 hour wait to try again<br>" + [DiceRollsArray];

    } else if (Number(vWins) == Number(1)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = "Takes 5 minutes<br>" + [DiceRollsArray];

    } else if (Number(vWins) == Number(2)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = "Rakes 30 seconds<br>" + [DiceRollsArray];

    } else if (Number(vWins) >= Number(3)) {
        document.getElementById("Results").innerHTML = "Success";
        document.getElementById("Rolls").innerHTML = "Instantaneous<br>" + [DiceRollsArray];

    } else if (Number(vWins) <= Number(0) && Number(vBotches) >= Number(1)) {
        document.getElementById("Results").innerHTML = "Botch";
        document.getElementById("Rolls").innerHTML = "Stuck between worlds<br>" + [DiceRollsArray];
    }
} // end slip sideways result function

////////////////
//
// DEBUGGING
//
////////////////

// ---- Variable showing final calculation in words ----
// let FullResult = "(" + vWins + " successes plus " + vWinsExtra + " automatic successes) MINUS (" + vBotches + " botches plus " + vBotchesExtra + " penalty botches) = " + vCalc + " successes."

// ----Show variables in console----
// console.log("NAME variable is " + VarName);
// console.log("NAME variable is " + VarName.value);

// ----Show variables in HTML window----
//  document.getElementById("ELEMENTID").innerHTML = VARIABLE;