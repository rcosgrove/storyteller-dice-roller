function displayArmorVariables() {
    console.log(">>> armor variables <<<");
    console.log("armorSelected variable is: " + armorSelected);
    console.log("armorSelected is: " + armorSelected);
    console.log("Armor variable is: " + armor);
    console.log("Armor dex penalty variable is: " + armorDexterityPenalty);
}

function displayStatsBase() {
    console.log(">>> base stats <<<");
    console.log("Form: " + vForm);
    console.log("StrengthBase: " + strengthBase);
    console.log("StaminaBase: " + staminaBase);
    console.log("DexterityBase: " + dexterityBase);
    console.log(">> adjusted stats <<");
}

function displayStatsAdjusted() {
    console.log(">>> adjusted stats <<<");
    console.log("Form: " + vForm);
    console.log("Strength: " + strength);
    console.log("Stamina: " + stamina);
    console.log("Dexterity: " + dexterity);
}

function displayDefenseVariables() {
    console.log(">>> defense variables <<<");
    console.log(`vPool is: ${vPool}`);
    console.log(`vDiff is: ${vDiff}`);
    console.log(`vForm is: ${vForm}`);
}

function displayTargetRangeVariables() {
    console.log(">>> target range variables <<<");
    console.log(`targetRange (ranged weapons) is ${targetRange}`);
    console.log(`throwingRange is ${throwingRange}`);
    console.log(`attackDiff is ${attackDiff}`);
}

function displayCoverVariables() {
    console.log(">>> cover variables <<<");
    console.log(`attackerCover is ${attackerCover}`);
    console.log(`attackerCoverPenalty is ${attackerCoverPenalty}`);
    console.log(`defenderCover is ${defenderCover}`);
    console.log(`defenderCoverPenalty is ${defenderCoverPenalty}`);
}

function displayAttackRollsVariables() {
    console.log(">>> attack roll variables <<<");
    console.log(`DiceModifierUser is ${DiceModifierUser}`);
    console.log(`attackDiceModifer is ${attackDiceModifer}`);
    console.log(`attackDiffModifier is ${attackDiffModifier}`);
}

function displayFirearmScopeVariables() {
    console.log(">>> firearm scope variables <<<");
    console.log(`setFirearmScope() - scopeFitted is ${scopeFitted}`);
    console.log(`setFirearmScope() - scopeBonus is ${scopeBonus}`);
}

function displayMovingOpponentVariables() {
    console.log(">>> moving target variables <<<");
    console.log(`targetMoving is ${targetMoving}`);
    console.log(`movingTargetPenalty is ${movingTargetPenalty}`);
}

function displayCalledShotVariables() {
    console.log(">>> called shot variables <<<");
    console.log(`calledShot is ${calledShot}`);
    console.log(`calledShotBonus is ${calledShotPenalty}`);
}

function displayChangedActionVariables() {
    console.log(">>> changed action variables <<<");
    console.log(`changedAction is ${changedAction}`);
    console.log(`changedActionPenalty is ${changedActionPenalty}`);
}

function displayOpponentIsStunnedVariables() {
    console.log(">>> stunned opponent variables <<<");
    console.log(`OpponentIsStunned is ${OpponentIsStunned}`);
    console.log(`stunnedOpponentBonus is ${stunnedOpponentBonus}`);
}

function displayFlankingVariables() {
    console.log(">>> flanking variables <<<");
    console.log(`flankingPosition is ${flankingPosition}`);
    console.log(`flankingBonus is ${flankingBonus}`);
}

function displayAimingBonusVariables() {
    console.log(">>> aiming variables <<<");
    console.log(`aimingBonus is ${aimingBonus}`);
    console.log(`aimingAttackBonus is ${aimingAttackBonus}`);
}

function displayShootingModeAttackModifiersVariables() {
    console.log(">>> shooting mode variables <<<");
    console.log(`shootingModeAttackDiceBonus is ${shootingModeAttackDiceBonus}`);
    console.log(`shootingModeAttackDiffModifier is ${shootingModeAttackDiffModifier}`);
}

function displayAttackAndDamageVariables() {
    console.log(">>> attack and damage variables <<<");
    console.log(`vAttackType is: ${vAttackType}`);
    console.log(`vDiff is: ${vDiff}`);
    console.log(`vDamageType is: ${vDamageType}`);
    console.log(`dicePoolAttack is: ${dicePoolAttack}`);
    console.log(`dicePoolDamage is: ${dicePoolDamage}`);
    console.log(`vForm is: ${vForm}`);
}