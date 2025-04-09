// GLOBAL VARIABLES

// Base difficulty
var attackDifficultyBase = Number(6);

// Dice modifiers
var vWinsExtra = Number(0);
var aimingAttackBonus = Number(0);
var scopeBonus = Number(0);
var shootingModeAttackDiceBonus = Number(0);
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
var shootingModeAttackDiffModifier = Number(0);
var userDifficultyModifier = Number(0);
var attackDifficultyModifier = Number(0); // calculated in formula
// set base attack difficulty for ranged weapons based on range and weapon type, selected by user from menu

// selection variables
var weaponSelected;
var attackName;
var weaponType;

// attack and damage roll variables
var attackDicePool;
var attackDifficulty;
var damageDicePool;
var damageDifficulty = Number(6);


function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;

    // limit number ranges using following function call:
    // variable = clamp(variable, minimum value, maximum value);
}

function setRangedAttackDifficulty() {
    switch (weaponType) {
        case "firearm":
            let targetRangeFirearms = document.getElementById("rangeToTarget").value;
            switch (targetRangeFirearms) {
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
            }
        case "thrown":
            let targetRangeThrownWeapons = document.getElementById("targetRangeThrownWeapons").value;
            switch (targetRangeThrownWeapons) {
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
            }
    }
}

function setShootingModeAttackModifiers() {
    // set shooting mode dice and difficulty modifiers
    let shootingMode = document.getElementById("fireRate").value;
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
}

function calculateAttackDicePoolModifier() {
    // get value of user-entered dice modifier
    userDiceModifier = Number(document.getElementById("DiceModifierUser").value);

    // set health level dice penalty
    DicePenaltyHealth = Number(document.getElementById("HealthLevelMenu").value);

    // get value of user-entered bonus successes
    vWinsExtra = Number(document.getElementById("UserWinsExtra").value);

    // get value of user-entered penalty botches
    vBotchesExtra = Number(document.getElementById("UserBotchesExtra").value);

    // get scopeFitted dice bonus value, based on checkbox boolean
    let scopeFitted = document.getElementById("scopeFittedSwitch").checked;
    scopeFitted ? scopeBonus = Number(2) : scopeBonus = Number(0);

    // get aiming dice bonus value, based on user entry
    let aimingBonus = Number(document.getElementById("aimingTurns").value);
    aimingAttackBonus = Number(aimingBonus);

    // sum dice modifier variables
    // check if health and botchesextra values are negatives

    attackDiceModifier = (shootingModeAttackDiceBonus + userDiceModifier + DicePenaltyHealth + scopeBonus + aimingAttackBonus);

}

function calculateAttackDifficultyModifier() {
    // get value of user-entered difficulty modifier
    userDifficultyModifier = Number(document.getElementById("UserDiffMod").value);

    // get moving target difficulty penalty, based on checkbox boolean
    let targetMoving = document.getElementById("opponentMoving").checked;
    targetMoving ? movingTargetPenalty = Number(1) : movingTargetPenalty = Number(0);

    // get called shot difficulty penalty, based on checkbox boolean
    let calledShot = document.getElementById("calledShotSwitch").checked;
    calledShot ? calledShotPenalty = Number(2) : calledShotPenalty = Number(0);

    // get changed action difficulty penalty, based on checkbox boolean
    let changedAction = document.getElementById("changedActionSwitch").checked;
    changedAction ? changedActionPenalty = Number(1) : changedActionPenalty = Number(0);

    // get stunned opponent action difficulty bonus, based on checkbox boolean
    let opponentIsStunned = document.getElementById("stunnedSwitch").checked;
    opponentIsStunned ? stunnedOpponentBonus = Number(-2) : stunnedOpponentBonus = Number(0);

    // get flanking difficulty bonus, based on menu selection
    let flankingPosition = document.getElementById("flankingMenu").value;
    switch (flankingPosition) {
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

    // set attacker's cover difficulty penalty, based on menu selection
    let attackerCover = document.getElementById("coverAttacker").value;
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

    // set defenders's cover difficulty penalty, based on menu selection

    let defenderCover = document.getElementById("coverDefender").value;
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

    // calculate sum of difficulty modifiers
    
    let attackDifficultyModifier = Number((userDifficultyModifier + shootingModeAttackDiffModifier +  movingTargetPenalty + calledShotPenalty + changedActionPenalty + attackerCoverPenalty + defenderCoverPenalty + stunnedOpponentBonus + flankingBonus));
}

function setWeapon(menuId) {
    console.log("ranged attack");

    var weaponSelected = menuId.value;

    // setAbilityVariables();
    // ResetRangedAttackModifiers();

    // 'vDamageType 2' equals lethal damage

    switch (weaponSelected) {
        case "revolverLight":
            attackName = "Light revolver";
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "revolverHeavy":
            attackName: "Heavy revolver";
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "pistolLight":
            attackName: "Light pistol";
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "pistolHeavy":
            attackName: "Heavy pistol";
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            resetWeaponMenusNotHandguns();
            break;
        case "rifleHunting":
            attackName: "Hunting rifle";
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleAssault":
            attackName: "Assault rifle";
            dicePoolDamage = 7;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "rifleHeavy":
            attackName: "Heavy rifle";
            dicePoolDamage = 10;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgLight":
            attackName: "Light SMG";
            dicePoolDamage = 4;
            vDamageType = 2;
            dicePoolAttack = dexterity + firearms;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "smgHeavy":
            attackName: "Heavy SMG";
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgunSawnOff":
            attackName: "Sawn-off shotgun";
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotRifles();
            break;
        case "shotgun":
            attackName: "Shotgun";
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunSemi":
            attackName: "Semi-automatic shotgun";
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotShotguns();
            break;
        case "shotgunAssault":
            attackName: "Assault shotgun";
            dicePoolDamage = 8;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponFullAutoUI();
            resetWeaponMenusNotShotguns();
            break;
        case "riotShotgun":
            attackName: "Riot gun";
            dicePoolDamage = 8;
            vDamageType = 1; // bashing damage
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bowShort":
            attackName: "Short bow";
            dicePoolDamage = 4;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowHunting":
            attackName: "Hunting bow";
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "bowLong":
            attackName: "Long bow";
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowCommando":
            attackName: "Commando crossbow";
            dicePoolDamage = 3;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbow":
            attackName: "Crossbow";
            dicePoolDamage = 5;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "xbowHeavy":
            attackName: "Heavy crossbow";
            dicePoolDamage = 6;
            vDamageType = 2;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotBows();
            break;
        case "taser":
            attackName: "Taser";
            dicePoolDamage = 5;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "tearGas":
            attackName: "Tear gas grenade";
            dicePoolDamage = 3;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
        case "bearMace":
            attackName: "Bear mace";
            dicePoolDamage = 3;
            vDamageType = 1;
            setRangedAttackCommonVariables();
            setWeaponSingleShotUI();
            resetWeaponMenusNotNonlethal();
            break;
            // thrown weapons
        case "knifeThrown":
            attackName: "Throwing knife";
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
            attackName: "Shuriken";
            dicePoolDamage = Number(3);
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "spearThrown":
            attackName: "Thrown spear";
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneSmall":
            attackName: "Small stone";
            dicePoolDamage = strength;
            vDamageType = 1;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "stoneBig":
            attackName: "Big stone";
            dicePoolDamage = strength + 3;
            vDamageType = 1;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
        case "tomahawkThrown":
            attackName: "Thrown tomahawk";
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setThrownAttackCommonVariables();
            setThrownWeaponUI();
            resetWeaponMenusNotThrown();
            break;
            // melee weapons
        case "baseballBat":
            attackName: "Baseball bat";
            attackDifficultyBase = 5;
            dicePoolDamage = strength + 2;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "chain":
            attackName: "Chain";
            attackDifficultyBase = 5;
            dicePoolDamage = strength;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "sap":
            attackName: "Sap";
            attackDifficultyBase = 4;
            dicePoolDamage = strength;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "staff":
            attackName: "Staff";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotBlunt();
            break;
        case "axe":
            attackName: "Axe";
            attackDifficultyBase = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "chainsaw":
            attackName: "Chainsaw";
            attackDifficultyBase = 8;
            dicePoolDamage = strength + 7;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaive":
            attackName: "Klaive";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 3;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "klaiveGrand":
            attackName: "Grand klaive";
            attackDifficultyBase = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 3;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "knife":
            attackName: "Knife";
            attackDifficultyBase = 4;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "sword":
            attackName: "Sword";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "whip":
            attackName: "Whip";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
        case "axeGreat":
            attackName: "Great axe";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 6;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "mace":
            attackName: "Mace";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "polearm":
            attackName: "Polearm";
            attackDifficultyBase = 7;
            dicePoolDamage = strength + 3;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClub":
            attackName: "Spiked club";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 2;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedClubHuge":
            attackName: "Huge spiked club";
            attackDifficultyBase = 7;
            dicePoolDamage = strength + 4;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "spikedGauntlet":
            attackName: "Spiked gauntlet";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "swordGreat":
            attackName: "Great sword";
            attackDifficultyBase = 5;
            dicePoolDamage = strength + 6;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "bottle":
            attackName: "Broken bottle";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "chair":
            attackName: "Chair";
            attackDifficultyBase = 7;
            dicePoolDamage = strength + 2;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "table":
            attackName: "Table";
            attackDifficultyBase = 8;
            dicePoolDamage = strength + 3;
            vDamageType = 1;
            setMeleeAttackCommonVariables();
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotImprovised();
            break;
        case "spear":
            attackName: "Spear";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotMedieval();
            break;
        case "tomahawk":
            attackName: "Tomahawk";
            attackDifficultyBase = 6;
            dicePoolDamage = strength + 1;
            vDamageType = 2;
            setMeleeAttackCommonVariables();
            resetMeleeWeaponMenusNotEdged();
            break;
    }

    console.log(`attackName var is: ${attackName}`);
    console.log(`weaponSelected var is: ${weaponSelected}`);
    console.log(`vAttackType var is: ${vAttackType}`);
    console.log(`attackMove var is: ${attackMove}`);
    console.log(`vAttackType var is: ${vAttackType}`);
    console.log(`attackDifficultyBase var is: ${attackDifficultyBase}`);
    console.log(`dicePoolDamage var is: ${dicePoolDamage}`);
    console.log(`vDamageType var is: ${vDamageType}`);

}

    ResetResultsDisplay();

function calculateAttackDicePool() {
        attackDicePool = Math.max((dicePoolAttack + attackDiceModifer), 1);
}

function calculateAttackDifficulty() {
        attackDifficulty = (attackDifficultyBase + attackDifficultyModifier);

    // limit calculated modifier to between 2 and 10
    clamp(attackDifficulty, 2, 10); 

}

