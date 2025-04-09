// global variables


// list of characters saved
const WtA20Chars = [];

// armor
var armorSelected;
var armorTypeSelected;
var armor = Number(0);
var armorDexterityPenalty = Number(0);

// character stats
// changable stats
var athletics = Number(2);
var brawl = Number(2);
var charname = Number(2);
var dexterity = Number(2);
var dodge = Number(2);
var firearms = Number(2);
var melee = Number(2);
var stamina = Number(2);
var strength = Number(2);
var subterfuge = Number(2);
var wits = Number(2);

// default stats - place below changeable stats
var dexterityBase = dexterity;
var staminaBase = stamina;
var strengthBase = strength;

// skill check variables
var vPool = Number(0);
var ability = Number(0);
var attribute = Number(0);

// combat variables
var aimingAttackBonus = Number(0);
var attackDiceBonus = Number(0);
var attackDiceModifer = Number(0);
var attackDicePenalty = Number(0);
var attackDiff = Number(6);
var attackDiffModifier = Number(0);
var attackerCoverPenalty = Number(0);
var attackMove = Number(0);
var calledShotPenalty = Number(0);
var changedActionPenalty = Number(0);
var damageDiceModifier = Number(0);
var damageDiff = Number(6);
var defenderCoverPenalty = Number(0);
var DiceModifierUser = Number(0);
var dicePoolAttack = Number(0);
var dicePoolDamage = Number(0);
var flankingBonus = Number(0);
var movingTargetPenalty = Number(0);
var scopeBonus = Number(0);
var shootingModeAttackDiceBonus = Number(0);
var shootingModeAttackDiffBonus = Number(0);
var shootingModeAttackDiffModifier = Number(0);
var species = "garou";
var stunnedOpponentBonus = Number(0);
var vAttackType;
var vDamageType;
var vDiff;
var vForm = "homid";
var rangedWeapon;
var attackSuccesses;

// temporary variables
var vHealthLevel = Number(0);
var damageModUser = Number(0);
var bonusDamage = Number(0);

// dice roll variables
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


function ResetRangedAttackModifiers() {
    shootingModeAttackDiceBonus = Number(0);
    shootingModeAttackDiffModifier = Number(0);
}

function ResetThrownAttackModifiers() {
    shootingModeAttackDiceBonus = Number(0);
    shootingModeAttackDiffModifier = Number(0);
}

function uncheckCombatCheckboxes() {
    var inputs = document.querySelectorAll('.combatCheckbox');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
}

function setAttackRollModifiers() {
    // console.log("running setAttackRollModifiers()");

    // console.log("running setAiming()");
    setAiming();

    // console.log("running setFirearmScope()");
    setFirearmScope();

    // console.log("returned to setAttackRollModifiers()");

    DiceModifierUser = Number(document.getElementById("DiceModifierUser").value);

    // dice modifiers
    attackDiceModifer = (DiceModifierUser + shootingModeAttackDiceBonus + aimingAttackBonus + scopeBonus);

    // difficulty modifiers
    attackDiffModifier = (attackDiffModifier + attackerCoverPenalty + defenderCoverPenalty + changedActionPenalty + flankingBonus + stunnedOpponentBonus + calledShotPenalty + movingTargetPenalty + shootingModeAttackDiffModifier);

    // displayAttackRollsVariables(); // used for diagnostics
}

function setBaseAbilityVariables() {
    // set base (homid) ratings for strength, dexterity and stamina based on initial numbers in fields
    // adjusted stats will reset to these values
    strengthBase = Number(document.getElementById("strength").value);
    dexterityBase = Number(document.getElementById("dexterity").value);
    staminaBase = Number(document.getElementById("stamina").value);
}

function setAbilityVariables() {
    // set ratings based on intergars in fields
    athletics = Number(document.getElementById("athletics").value);
    brawl = Number(document.getElementById("brawl").value);
    charname = Number(document.getElementById("charname").value);
    dexterity = Number(document.getElementById("dexterity").value);
    dodge = Number(document.getElementById("dodge").value);
    firearms = Number(document.getElementById("firearms").value);
    melee = Number(document.getElementById("melee").value);
    stamina = Number(document.getElementById("stamina").value);
    strength = Number(document.getElementById("strength").value);
    subterfuge = Number(document.getElementById("subterfuge").value);
    wits = Number(document.getElementById("wits").value);
}


///////
// COMMON ROLL FUNCTIONS 
//////

function menuItemSelect(param) {
    // reset variables to clear old values
    window[NewVar] = [undefined];

    // SelectedMenu = ID of menu
    let selectedMenu = document.getElementById(param).id;
    // el = ID of menu to run function
    let el = document.getElementById(param);
    // value = value of selected menu item
    let selectedValue = el.querySelector("option:checked").value;
    // name for variable to store called value
    // new variable format is vMenuName
    var newVar = `v${selectedMenu}`;
    window[newVar] = Number(SelectedValue);
}

function validateDiceRollInput() {
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
}

function setBaseDicePool(ability, attribute) {
    vPool = ability + attribute;
}

function resetDiceRollVariables() {
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
}

function resetAttackDiceRollVariables() {
    // ability roll variables

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
}

function resetAttackDiceRollVariablesAfterRoll() {
    // attack and damage roll variables
    aimingAttackBonus = Number(0);
    attackDiceBonus = Number(0);
    attackDiceModifer = Number(0);
    attackDicePenalty = Number(0);
    attackDiff = Number(6);
    attackDiffModifier = Number(0);
    attackerCoverPenalty = Number(0);
    attackMove = "";
    calledShotPenalty = Number(0);
    changedActionPenalty = Number(0);
    damageDiceModifier = Number(0);
    damageDiff = Number(6);
    defenderCoverPenalty = Number(0);
    DiceModifierUser = Number(0);
    dicePoolAttack = Number(0);
    dicePoolDamage = Number(0);
    flankingBonus = Number(0);
    movingTargetPenalty = Number(0);
    scopeBonus = Number(0);
    shootingModeAttackDiceBonus = Number(0);
    shootingModeAttackDiffBonus = Number(0);
    shootingModeAttackDiffModifier = Number(0);
    stunnedOpponentBonus = Number(0);

}

function resetDiceRollVariablesExtra() {
    vWinsExtra = Number(0);
    vBotchesExtra = Number(0);
}

function setBonusPenaltySuccesses() {
    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);

    if (vWinsExtra == "") {
        vWinsExtra = Number(0);
    }

    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    if (vBotchesExtra == "") {
         vBotchesExtra = Number(0);
    }
}

function resetResultsWindow() {
    document.getElementById("Rolls1").style.display = "block";
    document.getElementById("Rolls1").innerHTML = DiceRollsArray;
    document.getElementById("Rolls2").style.display = "none";
    document.getElementById("Rolls3").style.display = "none";
    document.getElementById("Rolls4").style.display = "none";
    document.getElementById("Rolls5").style.display = "none";
}

function CountRollResults() {
    // Calculate success, failure or botch
    // Validate bonus success and extra botch user entry fields

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
            vWins += 2;
        }

        // if Specialised is true
        // if intergar is 9 or 10, increase vWins variable by 2
        else if (Specialised == "true" && vDiceResult >= 9) {
            vWins += 2;
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


///////
// MODIFIERS
///////

function SetAuspice() {
    // Set Auspice global variable on menu change
    AuspiceSettingSelected = document.getElementById("AuspiceMenu");
    AuspiceSettingSelected.addEventListener("change", function handleChange(event) {
        AuspiceSetting = Number(event.target.value);
    })
} // end SetAuspice

// SET ARMOR VARIABLES FROM MENU CHANGE

function setArmor() {
    let valueSelected = document.getElementById("armorMenu").value;
    armorSelected = valueSelected;
    switch (armorSelected) {
        case "block":
            armor = Number(0);
            armorDexterityPenalty = Number(0);
            break;
        case "bearskinCoat":
            armor = Number(3);
            armorDexterityPenalty = Number(3);
            break;
        case "clothesTough":
            armor = Number(1);
            armorDexterityPenalty = Number(0);
            break;
        case "hide1":
            armor = Number(1);
            armorDexterityPenalty = Number(0);
            break;
        case "hide2":
            armor = Number(2);
            armorDexterityPenalty = Number(0);
            break;
        case "hide3":
            armor = Number(3);
            armorDexterityPenalty = Number(0);
            break;
        case "leatherJacket":
            armor = Number(1);
            armorDexterityPenalty = Number(1);
            break;
        case "bikerJacket":
            armor = Number(2);
            armorDexterityPenalty = Number(1);
            break;
        case "leatherRaincoat":
            armor = Number(2);
            armorDexterityPenalty = Number(2);
            break;
        case "riotSuit":
            armor = Number(5);
            armorDexterityPenalty = Number(3);
            break;
        case "steelBreastplate":
            armor = Number(3);
            armorDexterityPenalty = Number(2);
            break;
        case "trashcan":
            armor = Number(2);
            armorDexterityPenalty = Number(0);
            break;
        case "vestFlak":
            armor = Number(4);
            armorDexterityPenalty = Number(2);
            break;
        case "vestKevlar":
            armor = Number(3);
            armorDexterityPenalty = Number(1);
            break;
        default:
            // no armor
            armor = Number(0);
            armorDexterityPenalty = Number(0);
    }
    // displayArmorVariables(); // use for diagnostics 
}

// SET GAROU FORM VARIABLE AND ADJUST STATS FROM MENU CHANGE

function setFormGarou() {
    let valueSelected = document.getElementById("formMenuGarou").value;
    vForm = valueSelected;
    switch (vForm) {
        case "homid":
            strength = strengthBase;
            dexterity = dexterityBase;
            stamina = staminaBase;
            hideBiteAndClawAttackButtons();
            setHumanoidFormAttacksUI();
            showRangedWeaponsDiv();
            break;
        case "glabro":
            strength = strengthBase + 2;
            dexterity = dexterityBase;
            stamina = staminaBase + 2;
            showBiteAndClawAttackButtons();
            setHumanoidFormAttacksUI();
            showRangedWeaponsDiv();
            break;
        case "crinos":
            strength = strengthBase + 4;
            dexterity = dexterityBase + 2;
            stamina = staminaBase + 3;
            showBiteAndClawAttackButtons();
            setHumanoidFormAttacksUI();
            showRangedWeaponsDiv();
            break;
        case "hispo":
            strength = strengthBase + 3;
            dexterity = dexterityBase + 2;
            stamina = staminaBase + 3;
            showBiteAndClawAttackButtons();
            hideRangedWeaponsDiv();
            setBeastFormAttacksUI();
            break;
        case "lupus":
            strength = strengthBase + 1;
            dexterity = dexterityBase + 2;
            stamina = staminaBase + 2;
            showBiteAndClawAttackButtons();
            hideRangedWeaponsDiv();
            setBeastFormAttacksUI();
            break;
        default:
            // homid
            strength = strengthBase;
            dexterity = dexterityBase;
            stamina = staminaBase;
            hideBiteAndClawAttackButtons();
            showRangedWeaponsDiv();
    }
    // console.log(`vForm is ${vForm}`);
    // displayStatsBase(); // use for diagnostics
    // displayStatsAdjusted(); // use for diagnostics
    // update attribute fields with adjusted stats
    document.getElementById("strength").setAttribute("value", Number(strength));
    document.getElementById("dexterity").setAttribute("value", Number(dexterity));
    document.getElementById("stamina").setAttribute("value", Number(stamina));

}


///////
// ATTACK AND DAMAGE ROLL FUNCTIONS
///////

// SET SPECIES VARIABLE AND ADJUST UI FROM MENU CHANGE
// incomplete

function setSpecies() {
    let valueSelected = document.getElementById("speciesMenu").value;
    species = valueSelected;
    switch (species) {
        case "garou":
            //
            break;
        case "human":
            //
            break;
        default:
            // garou
            //
    }
}

// SET FIREARM ATTACK/DAMAGE VARIABLES BASED ON CHECKBOX

function setFirearmScope() {
    // console.log("running setFirearmScope()");

    // set scopeFitted to true/false
    var scopeFitted = document.getElementById("scopeFittedSwitch").checked;

    // set scopeBonus based on boolean
    // adds 2 dice bonus to attack roll dice pool
    scopeFitted ? scopeBonus = 2 : scopeBonus = 0;

/*
    switch (scopeFitted) {
        case true:
            scopeBonus = 2;
            break;
        case false:
            scopeBonus = 0;
            break;
        default:
            scopeBonus = 0;
    }
*/

    // displayFirearmScopeVariables(); // used for diagnostics
    // 
}

function setOpponentMovingPenalty() {
    // set targetMoving to true/false
    var targetMoving = document.getElementById("opponentMoving").checked;
    // set movingTargetPenalty based on boolean
    // adds +1 to attack difficulty

    targetMoving ? movingTargetPenalty = 1 : movingTargetPenalty = 0;

    /*
    switch (targetMoving) {
        case true:
            movingTargetPenalty = 1;
            break;
        case false:
            movingTargetPenalty = 0;
            break;
        default:
            movingTargetPenalty = 0;
    }
    */
   
    // displayMovingOpponentVariables(); // used for diagnostics
}

function setCalledShot() {
    // set calledShot to true/false
    var calledShot = document.getElementById("calledShotSwitch").checked;
    // set calledShotPenalty based on boolean
    // adds +2 to attack difficulty

    calledShot ? calledShotPenalty = 2 : calledShotPenalty = 0;

/*
    switch (calledShot) {
        case true:
            calledShotPenalty = 2;
            break;
        case false:
            calledShotPenalty = 0;
            break;
        default:
            calledShotPenalty = 0;
    }
    */
   
    // displayCalledShotVariables(); // used for diagnostics
    // 
}

function setChangedAction() {
    // set calledShot to true/false
    var changedAction = document.getElementById("changedActionSwitch").checked;

    // set changedAction based on boolean
    // adds +1 to attack difficulty
    changedAction ? changedActionPenalty = 1 : changedActionPenalty = 0;

/*
    switch (changedAction) {
        case true:
            changedActionPenalty = 1;
            break;
        case false:
            changedActionPenalty = 0;
            break;
        default:
            changedActionPenalty = 0;
    }
    */
   
    // displayChangedActionVariables(); // used for diagnosics
}

function setStunned() {
    var OpponentIsStunned = document.getElementById("stunnedSwitch").checked;
    // set OpponentIsStunned based on boolean
    // adds -2 to attack difficulty

    OpponentIsStunned ? stunnedOpponentBonus = -2 : stunnedOpponentBonus = 0;

/*
    switch (OpponentIsStunned) {
        case true:
            stunnedOpponentBonus = -2;
            break;
        case false:
            stunnedOpponentBonus = 0;
            break;
        default:
            stunnedOpponentBonus = 0;
    }
    */
   
    // displayOpponentIsStunnedVariables(); // used for diagnostics
}

function setFlankingVariable() {
    let valueSelected = document.getElementById("flankingMenu").value;
    flankingPosition = valueSelected;

    // set flankingBonus based on menu selection
    // adds -1 or -2 to attack difficulty
    switch (flankingPosition) {
        case "front":
            flankingBonus = 0;
            break;
        case "flank":
            flankingBonus = -1;
            break;
        case "behind":
            flankingBonus = -2;
            break;
        default:
            flankingBonus = 0;
    }
    // displayFlankingVariables(); // used for diagnostics
}

function setAiming() {
    // console.log("running setAiming()");

    let aimingBonus = Number(document.getElementById("aimingTurns").value);
    aimingAttackBonus = Number(aimingBonus);

    // displayAimingBonusVariables(); // used for diagnostics

}

function setShootingMode() {
    let valueSelected = document.getElementById("fireRate").value;
    shootingMode = valueSelected;

    // add ShootingModeMenu value to shootingMode var
    switch (shootingMode) {
        case "single":
            shootingModeAttackDiceBonus = Number(0);
            shootingModeAttackDiffModifier = Number(0);
            break;
        case "burst":
            shootingModeAttackDiceBonus = Number(3);
            shootingModeAttackDiffModifier = Number(1);
            break;
        case "auto":
            shootingModeAttackDiceBonus = Number(10);
            shootingModeAttackDiffModifier = Number(2);
            break;
        default:
            shootingModeAttackDiceBonus = Number(0);
            shootingModeAttackDiffModifier = Number(0);
    }

    // displayShootingModeAttackModifiersVariables(); // used for diagnostics
    
}

function setTargetRange() {
    let valueSelected = document.getElementById("rangeToTarget").value;
    targetRange = valueSelected;
    switch (targetRange) {
        case "medium":
            attackDiff = 6;
            break;
        case "long":
            attackDiff = 8;
            break;
        case "pointblank":
            attackDiff = 4;
            break;
        default:
            attackDiff = 6;
    }
    // displayTargetRangeVariables(); // used for diagnostics
}

function setThrowingRange() {
    let valueSelected = document.getElementById("throwingRange").value;
    throwingRange = valueSelected;
    switch (throwingRange) {
        case "standard":
            attackDiff = 6;
            break;
        case "far":
            attackDiff = 7;
            break;
        case "close":
            attackDiff = 5;
            break;
        case "bigThing":
            attackDiff = 8;
            break;
        default:
            attackDiff = 6;
    }
    // displayTargetRangeVariables(); // used for diagnostics
}

function setCoverAttacker() {
    let valueSelected = document.getElementById("coverAttacker").value;
    attackerCover = valueSelected;
    switch (attackerCover) {
        case "block":
        case "prone":
            attackerCoverPenalty = 0;
            break;
        case "moving":
        case "behindWall":
            attackerCoverPenalty = 1;
            break;
        case "headExposed":
            attackerCoverPenalty = 2;
            break;
        default:
            attackerCoverPenalty = 0;
    }
    // displayCoverVariables(); // used for diagnostics
}

function setCoverDefender() {
    let valueSelected = document.getElementById("coverDefender").value;
    defenderCover = valueSelected;
    switch (defenderCover) {
        case "block":
            defenderCoverPenalty = 0;
            break;
        case "prone":
        case "moving":
            defenderCoverPenalty = 1;
            break;
        case "behindWall":
            defenderCoverPenalty = 2;
            break;
        case "headExposed":
            defenderCoverPenalty = 3;
            break;
        default:
            defenderCoverPenalty = 0;
    }
    // displayCoverVariables(); // used for diagnostics
}

function SetHealthDicePenalty() {
    let valueSelected = document.getElementById("HealthLevelMenu").value;
    DicePenaltyHealth = Number(valueSelected);
}

function attack() {
    displayAttackAndDamageVariables();
    ResetResultsDisplay();

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra 
    // console.log(`running resetAttackDiceRollVariables()`);
    resetAttackDiceRollVariables();

    // console.log(`running setBonusPenaltySuccesses()`);
    setBonusPenaltySuccesses(); // sets vWinsExtra and vBotchesExtra from user input

    // console.log(`running setAttackRollModifiers()`);
    setAttackRollModifiers(); // sets attackDiceModifer and attackDiffModifer from user input

    // console.log(`running SetHealthDicePenalty()`);
    SetHealthDicePenalty(); // calculates health penalty from user input

    // calculate modified dice pool
    // attackDiceModifer includes health dice penalty and user dice bonus/penalty value
    vPool = Math.max((dicePoolAttack + DicePenaltyHealth + attackDiceModifer), 1);

    // calculate modified attack difficulty
    vDiff = Math.max((vDiff + attackDiffModifier + UserDiffMod), 1);

    // make attack roll
    CheckSkillRoll(); // makes the attack roll
    CountRollResults(); // calculates the attack roll results

    var attackSuccesses = Number(vCalc);

    console.log(`attackSuccesses variable is: ${attackSuccesses}`);

    // make damage roll
    console.log(`running damage()`);
    damage();
}

function resetAllRangedWeaponsMenus() {
    document.getElementById("rangedWeaponsMenus").reset();
}

function resetHandgunsMenu() {
    document.getElementById("handgunsMenu").selectedIndex = 0;
}

function resetShotgunsMenu() {
    document.getElementById("shotgunsMenu").selectedIndex = 0;
}

function resetRiflesMenu() {
    document.getElementById("riflesMenu").selectedIndex = 0;
}

function resetBowsMenu() {
    document.getElementById("bowsMenu").selectedIndex = 0;
}

function resetNonlethalMenu() {
    document.getElementById("nonlethalMenu").selectedIndex = 0;
}

function resetThrownMenu() {
    document.getElementById("thrownMenu").selectedIndex = 0;
}

function resetBluntWeaponsMenu() {
    document.getElementById("bluntWeaponsMenu").selectedIndex = 0;
}

function resetEdgedWeaponsMenuMenu() {
    document.getElementById("edgedWeaponsMenu").selectedIndex = 0;
}

function resetMedievalWeaponsMenuMenu() {
    document.getElementById("medievalWeaponsMenu").selectedIndex = 0;
}

function resetImprovisedWeaponsMenuMenu() {
    document.getElementById("improvisedWeaponsMenu").selectedIndex = 0;
}


function setRangedAttackCommonVariables() {
    weaponType = "firearm";
    vAttackType = "ranged";
    attackMove = "ranged";
    dicePoolAttack = dexterity + firearms;
    vDiff = attackDiff;
}

function setThrownAttackCommonVariables() {
    weaponType = "thrown";
    vAttackType = "ranged";
    attackMove = "ranged";
    dicePoolAttack = dexterity + athletics;
    vDiff = attackDiff;
}

function setMeleeAttackCommonVariables() {
    weaponType = "melee";
    vAttackType = "melee";
    attackMove = "melee";
    dicePoolAttack = dexterity + melee;
}

function resetWeaponMenusNotHandguns() {
        setWeaponSingleShotUI();
    resetShotgunsMenu();
    resetRiflesMenu();
    resetBowsMenu();
    resetNonlethalMenu();
    resetThrownMenu();
}

function resetWeaponMenusNotRifles() {
    // used for rifles and SMGs
            resetHandgunsMenu();
            resetShotgunsMenu();
            resetBowsMenu();
            resetNonlethalMenu();
            resetThrownMenu();
}

function resetWeaponMenusNotShotguns() {
            resetHandgunsMenu();
            resetRiflesMenu();
            resetBowsMenu();
            resetNonlethalMenu();
            resetThrownMenu();
}

function resetWeaponMenusNotNonlethal() {
            resetHandgunsMenu();
            resetShotgunsMenu();
            resetRiflesMenu();
            resetBowsMenu();
            resetThrownMenu();
}

function resetWeaponMenusNotBows() {
            resetHandgunsMenu();
            resetShotgunsMenu();
            resetRiflesMenu();
            resetNonlethalMenu();
            resetThrownMenu();
}

function resetWeaponMenusNotThrown() {
            resetHandgunsMenu();
            resetShotgunsMenu();
            resetRiflesMenu();
            resetBowsMenu();
            resetNonlethalMenu();

}

function resetMeleeWeaponMenusNotBlunt() {
            resetEdgedWeaponsMenuMenu();
            resetMedievalWeaponsMenuMenu();
            resetImprovisedWeaponsMenuMenu();
}

function resetMeleeWeaponMenusNotEdged() {
            resetBluntWeaponsMenu();
            resetMedievalWeaponsMenuMenu();
            resetImprovisedWeaponsMenuMenu();
}

function resetMeleeWeaponMenusNotMedieval() {
            resetBluntWeaponsMenu();
            resetEdgedWeaponsMenuMenu();
            resetImprovisedWeaponsMenuMenu();
}

function resetMeleeWeaponMenusNotImprovised() {
            resetBluntWeaponsMenu();
            resetEdgedWeaponsMenuMenu();
            resetMedievalWeaponsMenuMenu();
}


function setWeapon(menuId) {
    console.log("ranged attack");

    var valueSelected = menuId.value;
    var weaponSelected = valueSelected;

    // setAbilityVariables();
    // ResetRangedAttackModifiers();

    // 'vDamageType 2' equals lethal damage

    switch (weaponSelected) {
        case "revolverLight":
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
resetWeaponMenusNotHandguns();
            break;
        case "revolverHeavy":
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
resetWeaponMenusNotHandguns();
            break;
        case "pistolLight":
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
resetWeaponMenusNotHandguns();
            break;
        case "pistolHeavy":
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
resetWeaponMenusNotHandguns();
            break;
        case "rifleHunting":
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleAssault":
            dicePoolDamage = 7;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleHeavy":
            dicePoolDamage = 10;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgLight":
            dicePoolDamage = 4;
            vDamageType = 2;
            dicePoolAttack = dexterity + firearms;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgHeavy":
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgunSawnOff":
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgun":
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunSemi":
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunAssault":
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotShotguns();
            break;
        case "riotShotgun":
            dicePoolDamage = 8;
            vDamageType = 1; // bashing damage
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bowShort":
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowHunting":
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowLong":
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowCommando":
            dicePoolDamage = 3;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbow":
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowHeavy":
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "taser":
            dicePoolDamage = 5;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "tearGas":
            dicePoolDamage = 3;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bearMace":
            dicePoolDamage = 3;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
            // thrown weapons
        case "knifeThrown":
            vDiff = 6;
            dicePoolDamage = strength;
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetHandgunsMenu();
            resetShotgunsMenu();
            resetRiflesMenu();
            resetBowsMenu();
            resetNonlethalMenu();
            break;
        case "shuriken":
            vDiff = 7;
            dicePoolDamage = Number(3);
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "spearThrown":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneSmall":
            vDiff = 5;
            dicePoolDamage = strength;
            vDamageType = 1;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneBig":
            vDiff = 5;
            dicePoolDamage = strength + 3;
            vDamageType = 1;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "tomahawkThrown":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
            // melee weapons
        case "baseballBat":
            vDiff = 5;
            dicePoolDamage = strength + 2;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "chain":
            vDiff = 5;
            dicePoolDamage = strength;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "sap":
            vDiff = 4;
            dicePoolDamage = strength;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "staff":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "axe":
            vDiff = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "chainsaw":
            vDiff = 8;
            dicePoolDamage = strength + 7;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaive":
            vDiff = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 3;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaiveGrand":
            vDiff = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 3;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "knife":
            vDiff = 4;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "sword":
            vDiff = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "whip":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "axeGreat":
            vDiff = 6;
            dicePoolDamage = strength + 6;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "mace":
            vDiff = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "polearm":
            vDiff = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClub":
            vDiff = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClubHuge":
            vDiff = 7;
            dicePoolDamage = strength + 4;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedGauntlet":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "swordGreat":
            vDiff = 5;
            dicePoolDamage = strength + 6;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "bottle":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "chair":
            vDiff = 7;
            dicePoolDamage = strength + 2;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "table":
            vDiff = 8;
            dicePoolDamage = strength + 3;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "spear":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "tomahawk":
            vDiff = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
    }

    console.log(`weaponSelected var is: ${weaponSelected}`);
    console.log(`vAttackType var is: ${vAttackType}`);
    console.log(`attackMove var is: ${attackMove}`);
    console.log(`vAttackType var is: ${vAttackType}`);
    console.log(`vDiff var is: ${vDiff}`);
    console.log(`dicePoolDamage var is: ${dicePoolDamage}`);
    console.log(`vDamageType var is: ${vDamageType}`);


    // attack();

}

function hideRangedWeaponsDiv() {
    document.getElementById("rangedAttacks").style.visibility = "hidden";
}

function showRangedWeaponsDiv() {
    document.getElementById("rangedAttacks").style.visibility = "visible";
}

function hideBiteAndClawAttackButtons() {
    document.getElementById("biteRollButton").style.visibility = "hidden";
    document.getElementById("clawRollButton").style.visibility = "hidden";
    document.getElementById("hamstringRollButton").style.visibility = "hidden";
    document.getElementById("jawlockRollButton").style.visibility = "hidden";
    document.getElementById("wishboneRollButton").style.visibility = "hidden";
}

function showBiteAndClawAttackButtons() {
    document.getElementById("biteRollButton").style.visibility = "visible";
    document.getElementById("clawRollButton").style.visibility = "visible";
    document.getElementById("hamstringRollButton").style.visibility = "visible";
    document.getElementById("jawlockRollButton").style.visibility = "visible";
    document.getElementById("wishboneRollButton").style.visibility = "visible";
}

function setBeastFormAttacksUI() {
    document.getElementById("grappleRollButton").style.visibility = "hidden";
    document.getElementById("kickRollButton").style.visibility = "hidden";
    document.getElementById("punchRollButton").style.visibility = "hidden";
    document.getElementById("hamstringMeleeRollButton").style.visibility = "hidden";
    document.getElementById("pistolwhipRollButton").style.visibility = "hidden";
    document.getElementById("curbstompRollButton").style.visibility = "hidden";
}

function setHumanoidFormAttacksUI() {
    document.getElementById("grappleRollButton").style.visibility = "visible";
    document.getElementById("kickRollButton").style.visibility = "visible";
    document.getElementById("punchRollButton").style.visibility = "visible";
    document.getElementById("hamstringMeleeRollButton").style.visibility = "visible";
    document.getElementById("pistolwhipRollButton").style.visibility = "visible";
    document.getElementById("curbstompRollButton").style.visibility = "visible";
}


function setWeaponFullAutoUI() {
    document.getElementById("fireRate").style.display = "block";
    document.getElementById("rangeToTargetMenu").style.display = "block";
    document.getElementById("scopeDiv").style.display = "block";
    document.getElementById("shootButton").style.display = "block";
    document.getElementById("throwingRangeMenu").style.display = "none";
    document.getElementById("thrownButton").style.display = "none";
}

function setWeaponSingleShotUI() {
    document.getElementById("fireRate").style.display = "none";
    document.getElementById("rangeToTargetMenu").style.display = "block";
    document.getElementById("scopeDiv").style.display = "block";
    document.getElementById("shootButton").style.display = "block";
    document.getElementById("throwingRangeMenu").style.display = "none";
    document.getElementById("thrownButton").style.display = "none";
}

function setThrownWeaponUI() {
    document.getElementById("fireRate").style.display = "none";
    document.getElementById("rangeToTargetMenu").style.display = "none";
    document.getElementById("scopeDiv").style.display = "none";
    document.getElementById("shootButton").style.display = "none";
    document.getElementById("throwingRangeMenu").style.display = "block";
    document.getElementById("thrownButton").style.display = "block";
}

function removeAimingTurns() {
    document.getElementById("aimingDiv").style.display = "none";
}

function showAimingTurns() {
    document.getElementById("aimingDiv").style.display = "block";
}

function setAttackVariablesThenCallAttack(clicked_id) {
    // sets attackMove variable to ID of attack button
    attackMove = clicked_id;
    console.log(`attackMove var is: ${attackMove}`);

    setAbilityVariables();

    switch (attackMove) {
        case "bite":
            switch (vForm) {
                case "hispo":
                    dicePoolDamage = strength + 2;
                    vAttackType = "melee";
                    vDiff = Number(5);
                    vDamageType = "aggravated";
                    dicePoolAttack = dexterity + brawl;
                    break;
                case "glabro":
                case "crinos":
                case "lupus":
                    dicePoolDamage = strength + 1;
                    vAttackType = "melee";
                    vDiff = Number(5);
                    vDamageType = "aggravated";
                    dicePoolAttack = dexterity + brawl;
                    break;
                case "homid":
                    dicePoolDamage = Number(-100);
                    vAttackType = "melee";
                    vDiff = Number(100);
                    vDamageType = "aggravated";
                    dicePoolAttack = Number(-100);
                    break;
            }
            break;
        case "tackle":
            vAttackType = "melee";
            vDiff = Number(7);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        case "claw":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "aggravated";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength + 1;
            break;
        case "grapple":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        case "kick":
            vAttackType = "melee";
            vDiff = Number(7);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength + 1;
            break;
        case "punch":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        case "blinding":
            vAttackType = "melee";
            vDiff = Number(9);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + subterfuge;
            dicePoolDamage = Number(0);
            break;
        case "bodyslam":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength + Number(2);
            break;
        case "curbstomp":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength + Number(2);
            break;
        case "lowblow":
            vAttackType = "melee";
            vDiff = Number(7);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        case "pistolwhip":
            vAttackType = "melee";
            vDiff = Number(7);
            vDamageType = "lethal";
            dicePoolAttack = dexterity + melee;
            dicePoolDamage = strength + Number(2);
            break;
        case "hamstring":
            vAttackType = "melee";
            vDiff = Number(8);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        case "hamstringMelee":
            vAttackType = "melee";
            vDiff = Number(9);
            vDamageType = "lethal";
            dicePoolAttack = dexterity + melee;
            dicePoolDamage = strength;
            break;
        case "jawlock":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = Number(0);
            break;
        case "wishbone":
            vAttackType = "melee";
            vDiff = Number(6);
            vDamageType = "lethal";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
            break;
        default:
            vAttackType = "melee";
            vDiff = Number(5);
            vDamageType = "bashing";
            dicePoolAttack = dexterity + brawl;
            dicePoolDamage = strength;
    }
    // displayAttackAndDamageVariables(); // used for diagostics

    // set vDamageType values to strings in HTML and calcDamage(), and remove following switch

    switch (vDamageType) {
        case "bashing":
            vDamageType = 1;
            break;
        case "lethal":
            vDamageType = 2;
            break;
        case "aggravated":
            vDamageType = 3;
            break;
        default:
            vDamageType = 1;
    }

    switch (attackMove) {
        case "blinding":
        case "jawlock":
            // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra 
            resetDiceRollVariables();
            resetDiceRollVariablesExtra();
            RollType = "typeskill";
            DiceModifierUser = Number(document.getElementById("DiceModifierUser").value);
            setBonusPenaltySuccesses();

            // make skill roll
            CheckSkillRoll(); // makes the attack roll
            CountRollResults(); // calculates the attack roll 
            ShowResultsSkillRoll();
            break;
        default:
            attack();
    }
}

function setDefenseVariablesThenCallDefend(clicked_id) {
    // sets attackMove variable to ID of attack button
    attackMove = clicked_id;
    console.log(`attackMove var is: ${attackMove}`);

    setAbilityVariables();

    switch (attackMove) {
        case "parry":
            vPool = dexterity + melee;
            vDiff = Number(document.getElementById("UserDiff").value);
            break;
        case "dodge":
            vPool = dexterity + dodge;
            vDiff = Number(document.getElementById("UserDiff").value);
            break;
        case "block":
            vPool = dexterity + brawl;
            vDiff = Number(document.getElementById("UserDiff").value);
            break;
        case "evasiveaction":
            vPool = wits + athletics;
            vDiff = Number(6);
    }

    // displayDefenseVariables(); // for diagnostics

    defend();
}

function damage() {
    // Apply health level penalty to number of dice in pool, if action roll being made
    // Select melee or gun attack type, and deactivate health penalty for latter
    resetResultsWindow();
    resetDiceRollVariables();
    resetDiceRollVariablesExtra();
    rollDamage();
    CountRollResults();
    calcDamageSuccessAdjustment();
    calcDamage();
    // resetAttackDiceRollVariablesAfterRoll();
    displayAttackAndDamageVariables();
}

function rollDamage() {

    // apply health dice penalty to melee attacks
    switch (vAttackType) {
        case "melee":
            HealthDicePenalty();
            DicePenaltiesTotal = vHealthLevel;
            break;
        case "firearms":
            DicePenaltiesTotal = Number(0);
            break;
        default:
            HealthDicePenalty();
            DicePenaltiesTotal = vHealthLevel;
    }

    // set dice pool to adjusted damage dice pool
    vPool = dicePoolDamage + DicePenaltiesTotal;

    // Repeat dice rolls, until counter equals vPool
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
}

function calcDamageSuccessAdjustment() {
    // add bonuses from user input and attack roll
    let damageAttackBonus = Math.max(vCalc - Number(1), 0);

    if (damageModUser == "") {
        damageModUser = Number(0);
    } else if (damageModUser >= Number(1)) {
        damageModUser = Number(document.getElementById("damageModUser").value);
    }

    // bonus damage success from attack successes plus user entered bonus
    var bonusDamage = Math.max(damageAttackBonus + damageModUser);
}

function calcDamage() {
    // Send success/faiure result to HTML window
    // set damage type for results display

    vCalc = vCalc + bonusDamage;

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

    switch (attackMove) {
        case "tackle":
            if (vCalc >= 1) {
                document.getElementById("Results").innerHTML = "Make an opposed Dex+Athletics roll (diff 6) Defender's diff: " + Math.min((attackSuccesses + 6), 10);
            } else if (vFinal == "FAILED") {
                document.getElementById("Results").innerHTML = "Attack failed";
            } else if (vFinal == "BOTCHED") {
                document.getElementById("Results").innerHTML = "TACKLE BOTCHED (see p298 for effect)";
            }
            break;
        case "bite":
        case "claw":
        case "grapple":
        case "kick":
        case "punch":
        case "bodyslam":
        case "curbstomp":
        case "lowblow":
        case "pistolwhip":
        case "hamstring":
        case "hamstringMelee":
        case "jawlock":
        case "wishbone":
        case "ranged":
            if (vCalc >= 2) {
                document.getElementById("Results").innerHTML = vCalc + " levels of " + vDamageType + " damage inflicted";
            } else if (vCalc == 1) {
                document.getElementById("Results").innerHTML = "1 level of " + vDamageType + " damage inflicted";
            } else if (vFinal == "FAILED") {
                document.getElementById("Results").innerHTML = "Attack failed";
            } else if (vFinal == "BOTCHED") {
                document.getElementById("Results").innerHTML = "ATTACK BOTCHED";
            }
            break;
    }
}

function defend() {
    ResetResultsDisplay();

    resetDiceRollVariables();
    resetDiceRollVariablesExtra();

    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);
    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    HealthDicePenalty();
    DiceModifierUser = Number(document.getElementById("DiceModifierUser").value);
    DicePenaltiesTotal = (DiceModifierUser + DicePenaltyHealth);

    setBonusPenaltySuccesses();

    // Call dice rolling functions
    CheckSkillRoll();
    CountRollResults();
    ShowResultsSkillRoll();

}


function rollSoak() {
    // WORKING
    // Damage soak function

    // Reset variables, except vPool, vDiff, vWinsExtra and vBotchesExtra 
    resetDiceRollVariables()
    resetDiceRollVariablesExtra();

    // Set vPool variable
    DicePool = stamina + armor;
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

    resetResultsWindow();

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
    document.getElementById("Rolls2").style.display = "If damage taken exceeds " + stamina + " levels stunned for 1 turn";
}

// end ShowResultsSoakRoll function