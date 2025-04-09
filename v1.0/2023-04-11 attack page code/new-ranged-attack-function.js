// GLOBAL VARIABLES

// Base difficulty
var attackDifficultyBase = Number(6);

// Dice modifiers
var attackSuccessesExtra = Number(0);
var aimingBonus = Number(0);
var scopeBonus = Number(0);
var fireRateAttackDiceBonus = Number(0);
var vBotchesExtra = Number(0);
var DicePenaltyHealth = Number(0);
var userDiceModifier = Number(0);
var attackDiceModifier = Number(0); // calculated in function

// Difficulty modifiers
var flankingBonus = Number(0);
var attackerCover = Number(0);
var defenderCover = Number(0);
var movingTargetPenalty = Number(0);
var calledShotPenalty = Number(0);
var changedActionPenalty = Number(0);
var fireRateAttackDiffModifier = Number(0);
var userDifficultyModifier = Number(0);
var attackDifficultyModifier = Number(0); // calculated in formula
// set base attack difficulty for ranged weapons based on range and weapon type, selected by user from menu

// selection variables
var weaponSelected;
var attackName;
var weaponType;
var checkboxId;
var checkboxStatus;

// attack and damage roll variables
var attackDicePool = Number(0);
var attackDifficulty = Number(6);
var damageDicePool = Number(0);
var damageDifficulty = Number(6);
var attackDiceRollsArray = [];
var damageDiceRollsArray = [];
var attackBotches = Number(0);
var damageSuccesses = Number(0);
var attackSuccesses = Number(0);
var attackBonusSuccessUser = Number(0);
var attackPenaltyBotchesUser = Number(0);
var attackExtraBotches = Number(0);
var damageBonusSuccesses = Number(0);
var attackSuccessesTotal = Number(0);
var attackResult = "";
var damageAttackBonusSuccesses = Number(0);
var vDamageType = "bashing";
var characterName = "Attacker";
var damageLevelsInflicted = Number(0);
var opponentMoving = false;
var calledShot = false;
var changedAction = false;
var opponentStunned = false;
var coverAttacker = "none";
var coverDefender = "none";


// health level tracking button
var healthCounter = 0;
var btn;

// diagnostics
var createdVariables = {};
var isItchecked = "waiting";
var createdVariablesCounter = 0;


// *****************
// UTILITY FUNCTIONS
// *****************

function clamp(val, min, max) {
    // limit calculated number to specified range

    return val > max ? max : val < min ? min : val;

    // limit number ranges using following function call:
    // variable = clamp(variable, minimum value, maximum value);
}

function arraySortNumeric(array) {
    // sort array of numbers in numeric order
    array.sort(function(a, b) {
        return a - b;
    });
}

function showCreatedVariablesInConsole() {
    str = JSON.stringify(createdVariables, null, 4); // indents output
    // console.log(str); // Logs output to dev tools console
}

function getElementValue(elementId) {
    // assign value of selected HTML element to variable named after element's ID
    // HTML syntax:
    // menus: onchange = "setValue(this)" or
    // buttons: onclick = "setValue(this)" 

    window[elementId] = elementId.value;

    // console.log("+++ get Value function +++")
    //  // console.log(`variable ${elementId.id} is ${window[elementId]}, and is a ${typeof window[elementId]}`);

    // increase createdVariablesCounter by 1
    createdVariablesCounter += 1;

    // add name of variable to createdVariables object
    createdVariables[`Created variable ${createdVariablesCounter}`] = elementId.id;

    // showCreatedVariablesInConsole();
}

function getElementValueNumber(elementId) {
    // assign value of selected HTML element to variable named after element's ID
    // HTML syntax:
    // menus: onchange = "setValue(this)" or
    // buttons: onclick = "setValue(this)" 

    window[elementId] = Number(elementId.value);

    // console.log("+++ get Value function +++")
    //  // console.log(`variable ${elementId.id} is ${window[elementId]}, and is a ${typeof window[elementId]}`);

    // increase createdVariablesCounter by 1
    createdVariablesCounter += 1;

    // add name of variable to createdVariables object
    createdVariables[`Created variable ${createdVariablesCounter}`] = elementId.id;

    // showCreatedVariablesInConsole();
}

function getCheckboxValue(elementId) {
  // assign value of selected HTML element to variable named after element's ID
  // HTML syntax:
  // onclick = "getCheckboxValue(this)"

  // console.log("+++ get Checkbox Value function +++");

  checkboxId = elementId.id;
  // console.log(`checkboxId variable is ${checkboxId}`);
  // console.log(`checkboxId variable type is ${typeof checkboxId}`);
  
  checkboxStatus = document.getElementById(`${checkboxId}`).checked;
  // console.log(`checkboxStatus variable is ${checkboxStatus}`);
  // console.log(`checkboxStatus variable type is ${typeof checkboxStatus}`);

  // increase createdVariablesCounter by 1
  createdVariablesCounter += 1;

  // add name of variable to createdVariables object
  createdVariables[`Created variable ${createdVariablesCounter}`] =
    elementId.id;

  showCreatedVariablesInConsole();
}

// *********************
// END UTILITY FUNCTIONS
// *********************

// ***********************
// Get variables for rolls
// ***********************

getCheckboxValue("calledShot");
getCheckboxValue("changedAction");
getCheckboxValue("opponentMoving");
getCheckboxValue("opponentStunned");
getCheckboxValue("scopeFitted");
getCheckboxValue("specialised");
getElementValue("attackDirection");
getElementValue("charname");
getElementValue("coverAttacker");
getElementValue("coverDefender");
getElementValue("fireRate");
getElementValueNumber("aimingTurns");
getElementValueNumber("attackBonusSuccessUser");
getElementValueNumber("attackPenaltyBotchesUser");
getElementValueNumber("damageDicePoolModifierUser");
getElementValueNumber("damageBonusSuccessUser");
getElementValueNumber("damagePenaltyBotchesUser");
getElementValueNumber("DicePenaltyHealth");
getElementValueNumber("targetRangeThrownWeapons");
getElementValueNumber("userDiceModifier");
getElementValueNumber("userDifficultyModifier");

// ***********************
// Roll functions
// ***********************

function setRangedAttackDifficulty() {
    switch (weaponType) {
        case "firearm":
            switch ("targetRangeFirearms") {
                case "medium":
                    attackDifficultyBase = 6;
                    break;
                case "long":
                    attackDifficultyBase = 8;
                    break;
                case "pointblank":
                    attackDifficultyBase = 4;
                    break;
                default:
                    attackDifficultyBase = 6;
                    break;
            }
        case "thrown":
            switch ("targetRangeThrownWeapons") {
                case "standard":
                    attackDifficultyBase = 6;
                    break;
                case "far":
                    attackDifficultyBase = 7;
                    break;
                case "close":
                    attackDifficultyBase = 5;
                    break;
                case "bigThing":
                    attackDifficultyBase = 8;
                    break;
                default:
                    attackDifficultyBase = 6;
                    break;
            }
    }
    // console.log(`attackDifficultyBase var is: ${attackDifficultyBase}`);
    // console.log(`attackDifficultyBase var is: ${typeof attackDifficultyBase}`);
}

function setFireRateAttackModifiers() {
    // set shooting mode dice and difficulty modifiers
    switch (fireRate) {
        case "single":
            fireRateAttackDiceBonus = Number(0);
            fireRateAttackDiffModifier = Number(0);
            break;
        case "burst":
            fireRateAttackDiceBonus = Number(3);
            fireRateAttackDiffModifier = Number(1);
            break;
        case "auto":
            fireRateAttackDiceBonus = Number(10);
            fireRateAttackDiffModifier = Number(2);
            break;
        default:
            fireRateAttackDiceBonus = Number(0);
            fireRateAttackDiffModifier = Number(0);
    }
    // console.log(`fireRateAttackDiceBonus var is: ${fireRateAttackDiceBonus}`);
    // console.log(`fireRateAttackDiffModifier var is: ${typeof fireRateAttackDiffModifier}`);
}

function calculateAttackDicePoolModifier() {
    scopeFitted ? scopeBonus = Number(2) : scopeBonus = Number(0);

    // sum dice modifier variables
    attackDiceModifier = fireRateAttackDiceBonus + userDiceModifier + DicePenaltyHealth + scopeBonus + aimingBonus;
    // console.log(`attackDiceModifier var is: ${attackDiceModifier}`);
    // console.log(`fireRateAttackDiceBonus var is: ${typeof fireRateAttackDiceBonus}`);
    // console.log(`userDiceModifier var is: ${userDiceModifier}`);
    // console.log(`DicePenaltyHealth var is: ${typeof DicePenaltyHealth}`);
    // console.log(`scopeBonus var is: ${scopeBonus}`);
    // console.log(`aimingBonus var is: ${typeof aimingBonus}`);

}

function calculateAttackDifficultyModifier() {
    console.log(`--- Running calculateAttackDifficultyModifier function ---`);
    console.log(`opponentMoving var is: ${opponentMoving}`);
    console.log(`opponentMoving var is: ${typeof opponentMoving}`);
    console.log(`calledShot var is: ${calledShot}`);
    console.log(`calledShot var is: ${typeof calledShot}`);
    console.log(`changedAction var is: ${changedAction}`);
    console.log(`opponentStunned var is: ${typeof opponentStunned}`);
    console.log(`attackDirection var is: ${attackDirection}`);
    console.log(`attackDirection var is: ${typeof attackDirection}`);
    console.log(`coverAttacker var is: ${coverAttacker}`);
    console.log(`coverAttacker var is: ${typeof coverAttacker}`);
    console.log(`coverDefender var is: ${coverDefender}`);
    console.log(`coverDefender var is: ${typeof coverDefender}`);

    opponentMoving ? movingTargetPenalty = Number(1) : movingTargetPenalty = Number(0);

    calledShot ? calledShotPenalty = Number(2) : calledShotPenalty = Number(0);

    changedAction ? changedActionPenalty = Number(1) : changedActionPenalty = Number(0);

    opponentStunned ? stunnedOpponentBonus = Number(-2) : stunnedOpponentBonus = Number(0);

    switch (attackDirection) {
        case "front":
            flankingBonus = Number(0);
            break;
        case "flank":
            flankingBonus = Number(-1);
            break;
        case "behind":
            flankingBonus = Number(-2);
            break;
        default:
            flankingBonus = Number(0);
    }

    switch (coverAttacker) {
        case "none":
        case "prone":
            attackerCoverPenalty = Number(0);
            break;
        case "moving":
        case "behindWall":
            attackerCoverPenalty = Number(1);
            break;
        case "headExposed":
            attackerCoverPenalty = Number(2);
            break;
        default:
            attackerCoverPenalty = Number(0);
    }

    switch (coverDefender) {
        case "none":
            defenderCoverPenalty = Number(0);
            break;
        case "prone":
        case "moving":
            defenderCoverPenalty = Number(1);
            break;
        case "behindWall":
            defenderCoverPenalty = Number(2);
            break;
        case "headExposed":
            defenderCoverPenalty = Number(3);
            break;
        default:
            defenderCoverPenalty = Number(0);
    }

    // calculate sum of difficulty modifiers

    attackDifficultyModifier = Number(userDifficultyModifier) + Number(fireRateAttackDiffModifier) + Number(opponentMoving) + Number(calledShotPenalty) + Number(changedActionPenalty) + Number(attackerCoverPenalty) + Number(defenderCoverPenalty) + Number(stunnedOpponentBonus) + Number(flankingBonus);

    attackDifficultyModifier = Number(attackDifficultyModifier);

    // console.log(`attackDifficultyModifier var is ${attackDifficultyModifier}`);
    // console.log(`attackDifficultyModifier var type is ${attackDifficultyModifier}`);

}

function setWeapon(menuId) {

    var weaponSelected = menuId.value;

    // setAbilityVariables();
    // ResetRangedAttackModifiers();

    // 'vDamageType 2' equals lethal damage

    switch (weaponSelected) {
        case "revolverLight":
            attackName = "Light revolver";
            dicePoolDamage = Number(4);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "revolverHeavy":
            attackName: "Heavy revolver";
            dicePoolDamage = Number(6);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "pistolLight":
            attackName: "Light pistol";
            dicePoolDamage = Number(4);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "pistolHeavy":
            attackName: "Heavy pistol";
            dicePoolDamage = Number(5);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "rifleHunting":
            attackName: "Hunting rifle";
            dicePoolDamage = Number(6);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleAssault":
            attackName: "Assault rifle";
            dicePoolDamage = Number(7);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleHeavy":
            attackName: "Heavy rifle";
            dicePoolDamage = Number(10);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgLight":
            attackName: "Light SMG";
            dicePoolDamage = Number(4);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgHeavy":
            attackName: "Heavy SMG";
            dicePoolDamage = Number(4);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgunSawnOff":
            attackName: "Sawn-off shotgun";
            dicePoolDamage = Number(8);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgun":
            attackName: "Shotgun";
            dicePoolDamage = Number(8);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunSemi":
            attackName: "Semi-automatic shotgun";
            dicePoolDamage = Number(8);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunAssault":
            attackName: "Assault shotgun";
            dicePoolDamage = Number(8);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotShotguns();
            break;
        case "riotShotgun":
            attackName: "Riot gun";
            dicePoolDamage = Number(8);
            vDamageType = Number(1); // bashing damage
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bowShort":
            attackName: "Short bow";
            dicePoolDamage = Number(4);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowHunting":
            attackName: "Hunting bow";
            dicePoolDamage = Number(5);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowLong":
            attackName: "Long bow";
            dicePoolDamage = Number(5);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowCommando":
            attackName: "Commando crossbow";
            dicePoolDamage = Number(3);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbow":
            attackName: "Crossbow";
            dicePoolDamage = Number(5);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowHeavy":
            attackName: "Heavy crossbow";
            dicePoolDamage = Number(6);
            vDamageType = Number(2);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "taser":
            attackName: "Taser";
            dicePoolDamage = Number(5);
            vDamageType = Number(1);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "tearGas":
            attackName: "Tear gas grenade";
            dicePoolDamage = Number(3);
            vDamageType = Number(1);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bearMace":
            attackName: "Bear mace";
            dicePoolDamage = Number(3);
            vDamageType = Number(1);
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
            // thrown weapons
        case "knifeThrown":
            attackName: "Throwing knife";
            dicePoolDamage = strength;
            vDamageType = Number(2);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "shuriken":
            attackName: "Shuriken";
            dicePoolDamage = Number(Number(3));
            vDamageType = Number(2);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "spearThrown":
            attackName: "Thrown spear";
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneSmall":
            attackName: "Small stone";
            dicePoolDamage = strength;
            vDamageType = Number(1);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneBig":
            attackName: "Big stone";
            dicePoolDamage = strength + Number(3);
            vDamageType = Number(1);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "tomahawkThrown":
            attackName: "Thrown tomahawk";
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
            // melee weapons
        case "baseballBat":
            attackName: "Baseball bat";
            attackDifficultyBase = Number(5);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "chain":
            attackName: "Chain";
            attackDifficultyBase = Number(5);
            dicePoolDamage = strength;
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "sap":
            attackName: "Sap";
            attackDifficultyBase = Number(4);
            dicePoolDamage = strength;
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "staff":
            attackName: "Staff";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "axe":
            attackName: "Axe";
            attackDifficultyBase = Number(7);
            dicePoolDamage = strength + Number(3);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "chainsaw":
            attackName: "Chainsaw";
            attackDifficultyBase = Number(8);
            dicePoolDamage = strength + Number(7);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaive":
            attackName: "Klaive";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(3);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaiveGrand":
            attackName: "Grand klaive";
            attackDifficultyBase = Number(7);
            dicePoolDamage = strength + Number(3);
            vDamageType = Number(3);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "knife":
            attackName: "Knife";
            attackDifficultyBase = Number(4);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "sword":
            attackName: "Sword";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "whip":
            attackName: "Whip";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "axeGreat":
            attackName: "Great axe";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(6);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "mace":
            attackName: "Mace";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "polearm":
            attackName: "Polearm";
            attackDifficultyBase = Number(7);
            dicePoolDamage = strength + Number(3);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClub":
            attackName: "Spiked club";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClubHuge":
            attackName: "Huge spiked club";
            attackDifficultyBase = Number(7);
            dicePoolDamage = strength + Number(4);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedGauntlet":
            attackName: "Spiked gauntlet";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "swordGreat":
            attackName: "Great sword";
            attackDifficultyBase = Number(5);
            dicePoolDamage = strength + Number(6);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "bottle":
            attackName: "Broken bottle";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "chair":
            attackName: "Chair";
            attackDifficultyBase = Number(7);
            dicePoolDamage = strength + Number(2);
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "table":
            attackName: "Table";
            attackDifficultyBase = Number(8);
            dicePoolDamage = strength + Number(3);
            vDamageType = Number(1);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "spear":
            attackName: "Spear";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "tomahawk":
            attackName: "Tomahawk";
            attackDifficultyBase = Number(6);
            dicePoolDamage = strength + Number(1);
            vDamageType = Number(2);
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
    }

    // console.log(`attackName var is: ${attackName}`);
    // console.log(`weaponSelected var is: ${weaponSelected}`);
    // console.log(`vAttackType var is: ${vAttackType}`);
    // console.log(`attackMove var is: ${attackMove}`);
    // console.log(`vAttackType var is: ${vAttackType}`);
    // console.log(`attackDifficultyBase var is: ${attackDifficultyBase}`);
    // console.log(`dicePoolDamage var is: ${dicePoolDamage}`);
    // console.log(`dicePoolDamage var type is: ${typeof dicePoolDamage}`);
    // console.log(`vDamageType var is: ${vDamageType}`);

}

// ResetResultsDisplay();

function calculateAttackDicePool() {
    attackDicePool = Math.max((dicePoolAttack + attackDiceModifier), 1);
}

function calculateAttackDifficulty() {
    console.log("--- running calculateAttackDifficulty() ---")
    console.log(`attackDifficultyBase var is: ${attackDifficultyBase}`);
    console.log(`attackDifficultyBase var type is: ${typeof attackDifficultyBase}`);
    console.log(`attackDifficultyModifier var is: ${attackDifficultyModifier}`);
    console.log(`attackDifficultyModifier var type is: ${typeof attackDifficultyModifier}`);

    attackDifficulty = (Number(attackDifficultyBase) + Number(attackDifficultyModifier));
    // limit calculated modifier to between 2 and 10
    clamp(attackDifficulty, 2, 10);

    console.log(`Calculated attackDifficulty var is: ${attackDifficulty}`);
    console.log(`Calculated attackDifficulty var type is: ${typeof attackDifficulty}`);

}

function attackDiceRoll() {
    // console.log("--- running attackDiceRoll() ---");


    // CHECK RESULTS OF DICE ROLL
    // Repeat RollDice function, until counter equals vPool
    let counter = 0; // set counter to start value of 0

    // Compare counter to attackDicePool
    while (counter <= attackDicePool) {
        // Increase counter counter by 1
        counter += 1;

        // Generate intergar between 1-10
        let diceResult = RollDice(1, 10);


        // Add integar to DiceRollsArray array
        attackDiceRollsArray.push(" " + diceResult);

        // if intergar equals 1, increase attackBotches variable by 1
        if (diceResult == 1) {
            attackBotches++;
            // console.log(`Attack dice roll ${counter} is ${diceResult}; attackBotches var is: ${attackBotches}; attackSuccesses var is: ${attackSuccesses}`);
        }

        // if Specialised is false
        // if intergar is 10, increase attackSuccesses variable by 2
        else if (Specialised == "false" && diceResult == 10) {
            attackSuccesses += 2;
            // console.log(`Attack dice roll ${counter} is ${diceResult}; attackBotches var is: ${attackBotches}; attackSuccesses var is: ${attackSuccesses}`);
        }

        // if Specialised is false
        // if intergar is between attackDifficulty value and 9, increase attackSuccesses variable by 1
        else if (Specialised == "false" && diceResult >= attackDifficulty && diceResult <= 9) {
            attackSuccesses++;
            // console.log(`Attack dice roll ${counter} is ${diceResult}; attackBotches var is: ${attackBotches}; attackSuccesses var is: ${attackSuccesses}`);
        }

        // if Specialised is true
        // if intergar is 9 or 10, increase attackSuccesses variable by 2
        else if (Specialised == "true" && diceResult >= 9) {
            attackSuccesses += 2;
            // console.log(`Attack dice roll ${counter} is ${diceResult}; attackBotches var is: ${attackBotches}; attackSuccesses var is: ${attackSuccesses}`);
        }

        // if Specialised is true
        // if intergar is 9 or 10, increase attackSuccesses variable by 2
        else if (Specialised == "true" && diceResult >= attackDifficulty && diceResult <= 8) {
            attackSuccesses++;
            // console.log(`Attack dice roll ${counter} is ${diceResult}; attackBotches var is: ${attackBotches}; attackSuccesses var is: ${attackSuccesses}`);
        }

    }

    // sort attackDiceRollsArray into numeric order
    arraySortNumeric(attackDiceRollsArray);

    // console.log(`attackSuccesses var is: ${attackSuccesses}`);
    // console.log(`attackSuccesses var type is: ${typeof attackSuccesses}`);
    // console.log(`attackBotches var is: ${attackBotches}`);
    // console.log(`attackBotches var type is: ${typeof attackBotches}`);

} // end attackDiceRoll function


function calculateAttackRollResult() {
    // Calculate success, failure or botch

    // Total successes and botches seperately, then find difference
    let AllWins = Number(attackSuccesses) + Number(attackBonusSuccessUser);
    let AllBotches = Number(attackBotches) - Number(attackPenaltyBotchesUser);
    attackSuccessesTotal = Number(AllWins) - Number(AllBotches);

    // Calculate success of failure by checking if vCalc equal or less than 0
    if (AllWins == Number(0) && attackBotches >= Number(1)) {
        attackResult = "BOTCHED";
        document.getElementById("Results").innerHTML = "BOTCHED!";
        document.getElementById("Rolls1").innerHTML = "Attack roll results";
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
    } else if (attackSuccessesTotal >= Number(1)) {
        attackResult = "SUCCESS";
        damageAttackBonusSuccesses = Number(Math.max((attackResult - 1), 0));
        damageDiceRoll();
    } else if (attackSuccessesTotal <= Number(0)) {
        attackResult = "FAILED";
        document.getElementById("Results").innerHTML = `${characterName}'s attack failed`;
        document.getElementById("Rolls1").innerHTML = "Attack roll results";
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
    }

    // console.log(`attackSuccesses var is: ${attackSuccesses}`);
    // console.log(`attackBonusSuccessUser var is: ${attackBonusSuccessUser}`);
    // console.log(`attackBotches var is: ${attackBotches}`);
    // console.log(`attackPenaltyBotchesUser var is: ${attackPenaltyBotchesUser}`);
    // console.log(`AllWins var is: ${AllWins}`);
    // console.log(`AllBotches var is: ${AllBotches}`);
    // console.log(`attackSuccessesTotal var is: ${attackSuccessesTotal}`);
    // console.log(`attackResult var is: ${attackResult}`);

} // end of calculateAttackRollResult function

function damageDiceRoll() {
    // console.log("+++ running damageDiceRoll +++")

    let damageDicePool = Number(dicePoolDamage) + Number(damageDicePoolModifierUser);

    // CHECK RESULTS OF DICE ROLL

    // Repeat DiceRoll function, until counter equals vPool
    let counter = 0; // set counter to start value of 1

    // Compare counter to vPool
    while (counter <= damageDicePool) {
        // Increase counter counter by 1
        counter += 1;

        // Generate intergar between 1-10
        let diceResult = RollDice(1, 10);

        // console.log(`Damage dice roll ${counter} is ${diceResult}`);

        // Add integar to DiceRollsArray array
        damageDiceRollsArray.push(" " + diceResult);

        // if intergar equals 1, increase damageBotches variable by 1
        if (diceResult >= damageDifficulty && diceResult <= 10) {
            damageSuccesses++;
        }
    }

    // sort attackDiceRollsArray into numeric order
    arraySortNumeric(damageDiceRollsArray);

    // console.log(`damageDiceRollsArray is ${damageDiceRollsArray}`);

    // console.log(`damageSuccesses value is ${damageSuccesses}`);
    // console.log(`damageSuccesses var type is ${typeof damageSuccesses}`);

} // end damageDiceRoll function

function calculateDamageRollResult() {
    // console.log("+++ running calculateDamageRollResult +++")

    let totalDamageSuccesses = Number(damageSuccesses) + Number(damageAttackBonusSuccesses) + Number(damageBonusSuccessUser);

    damageLevelsInflicted = Number(totalDamageSuccesses) - Number(damagePenaltyBotchesUser);

    // console.log(`damageLevelsInflicted var is ${damageLevelsInflicted}`);
    // console.log(`damageLevelsInflicted var type is ${typeof damageLevelsInflicted}`);

    switch (vDamageType) {
        case "bashing":
        case 1:
            vDamageType = "bashing";
            break;
        case "lethal":
        case 2:
            vDamageType = "lethal";
            break;
        case "aggravated":
        case 3:
            vDamageType = "aggravated";
            break;
        default:
            vDamageType = "bashing";
    }

    // console.log(`damageSuccesses var is: ${damageSuccesses}`);
    // console.log(`damageSuccesses var is: ${typeof damageSuccesses}`);
    // console.log(`damageAttackBonusSuccesses var is: ${damageAttackBonusSuccesses}`);
    // console.log(`damageAttackBonusSuccesses var is: ${typeof damageAttackBonusSuccesses}`);
    // console.log(`damageBonusSuccessUser var is: ${damageBonusSuccessUser}`);
    // console.log(`damageBonusSuccessUser var is: ${typeof damageBonusSuccessUser}`);
    // console.log(`totalDamageSuccesses var is: ${totalDamageSuccesses}`);
    // console.log(`totalDamageSuccesses var is: ${typeof totalDamageSuccesses}`);
    // console.log(`damageLevelsInflicted var is: ${damageLevelsInflicted}`);
    // console.log(`damageLevelsInflicted var is: ${typeof damageLevelsInflicted}`);
    // console.log(`vDamageType var is: ${vDamageType}`);
    // console.log(`vDamageType var is: ${typeof vDamageType}`);

}

function displayDamageResultsOnPage() {

    if (attackResult = "SUCCESS" && attackSuccessesTotal >= 2) {
        document.getElementById("Results").innerHTML = `${characterName}'s ${attackName} caused ${damageLevelsInflicted} levels of ${vDamageType} damage`;
        document.getElementById("Rolls1").innerHTML = `Attack roll results`;
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
        document.getElementById("Rolls3").innerHTML = `Damage roll results`;
        document.getElementById("Rolls4").innerHTML = `${damageDiceRollsArray}`;

    } else if (attackResult = "SUCCESS" && vCalc == 1) {
        document.getElementById("Results").innerHTML = `${characterName}'s ${attackName} caused 1 level of ${vDamageType} damage`;
        document.getElementById("Rolls1").innerHTML = `Attack roll results`;
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
        document.getElementById("Rolls3").innerHTML = `Damage roll results`;
        document.getElementById("Rolls4").innerHTML = `${damageDiceRollsArray}`;
    } else if (attackResult = "FAILED") {
        document.getElementById("Results").innerHTML = `${characterName}'s ${attackName} attack failed`;
        document.getElementById("Rolls1").innerHTML = `Attack roll results`;
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
    } else if (attackResult = "BOTCHED") {
        document.getElementById("Results").innerHTML = `${characterName} BOTCHED!`;
        document.getElementById("Rolls1").innerHTML = `Attack roll results`;
        document.getElementById("Rolls2").innerHTML = `${attackDiceRollsArray}`;
    }
}

function attackRanged() {
    // call ranged attack functions in order

    // console.log("+++ attackRanged function +++");

    // console.log("--- running setRangedAttackDifficulty function ---");
    setRangedAttackDifficulty();

    // console.log("--- running setFireRateAttackModifiers function ---");
    setFireRateAttackModifiers();

    // console.log("--- running calculateAttackDicePoolModifier function ---");
    calculateAttackDicePoolModifier();

    // console.log("--- running calculateAttackDifficultyModifier function ---");
    calculateAttackDifficultyModifier();

    // console.log("--- running ResetResultsDisplay function ---");
    ResetResultsDisplay();

    // console.log("--- running calculateAttackDicePool function ---");
    calculateAttackDicePool();

    console.log("--- running calculateAttackDifficulty function ---");
    calculateAttackDifficulty();

    // console.log("--- running attackDiceRoll function ---");
    attackDiceRoll();

    // console.log("--- running calculateAttackRollResult function ---");
    calculateAttackRollResult();

    // console.log("--- running damageDiceRoll function ---");
    damageDiceRoll();

    // console.log("--- running calculateDamageRollResult function ---");
    calculateDamageRollResult();

    // console.log("--- running displayDamageResultsOnPage function ---");
    displayDamageResultsOnPage();

    // console.log(createdVariables);

}

// dynanmic name healthCounter for each char's health button


function increaseHealthLevelDisplayed(button) {
    // disable context menu appearing on right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    healthCounter -= 1;
    clampHealthCounterValue();
    changeHealthLevelDisplayed(button);
}

function decreaseHealthLevelDisplayed(button) {
    healthCounter += 1;
    clampHealthCounterValue();
    changeHealthLevelDisplayed(button);
}

function clampHealthCounterValue() {
    healthCounter = clamp(healthCounter, 0, 7);
}

function changeHealthLevelDisplayed(button) {
    var btn = button.id;

    switch (healthCounter) {
        case 0:
            document.getElementById(btn).value = "Uninjured";
            break;
        case 1:
            document.getElementById(btn).value = "Bruised";
            break;
        case 2:
            document.getElementById(btn).value = "Hurt (-1)";
            DicePenaltyHealth = Number(-1);
            break;
        case 3:
            document.getElementById(btn).value = "Injured (-1)";
            DicePenaltyHealth = Number(-1);
            break;
        case 4:
            document.getElementById(btn).value = "Mauled (-2)";
            DicePenaltyHealth = Number(-2);
            break;
        case 5:
            document.getElementById(btn).value = "Crippled (-2)";
            DicePenaltyHealth = Number(-1);
            break;
        case 6:
            document.getElementById(btn).value = "Incapacitated (-5)";
            DicePenaltyHealth = Number(-5);
            break;
        case 7:
            document.getElementById(btn).value = "Dead/KO";
            break;
    }

}

function increaseLowLevelHealthLevelDisplayed(button) {
    // disable context menu appearing on right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    healthCounter -= 1;
    clampLowLevelHealthCounterValue();
    changeLowLevelHealthLevelDisplayed(button);
}

function decreaseLowLevelHealthLevelDisplayed(button) {
    healthCounter += 1;
    clampLowLevelHealthCounterValue();
    changeLowLevelHealthLevelDisplayed(button);
}

function clampLowLevelHealthCounterValue() {
    healthCounter = clamp(healthCounter, 0, 4);
}

function changeLowLevelHealthLevelDisplayed(button) {
    var btn = button.id;

    switch (healthCounter) {
        case 0:
            document.getElementById(btn).value = "Uninjured";
            DicePenaltyHealth = Number(0);
            break;
        case 1:
            document.getElementById(btn).value = "Injured (-1)";
            DicePenaltyHealth = Number(-1);
            break;
        case 2:
            document.getElementById(btn).value = "Mauled (-3)";
            DicePenaltyHealth = Number(-3);
            break;
        case 3:
            document.getElementById(btn).value = "Incapacitated (-5)";
            DicePenaltyHealth = Number(-5);
            break;
        case 4:
            document.getElementById(btn).value = "Dead/KO";
            break;
    }
}