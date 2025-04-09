function NewCharacter(name, strength, dexterity, stamina, wits, athletics, brawl, dodge, firearms, melee, armor) {

    // New character constructor

    this.Armor = armor;
    this.Name = name;
    this.Athletics = athletics;
    this.Brawl = brawl;
    this.Dexterity = dexterity;
    this.Dodge = dodge;
    this.Firearms = firearms;
    this.Melee = melee;
    this.Stamina = stamina;
    this.Strength = strength;
    this.Subterfuge = subterfuge;
    this.Wits = wits;

}

// SAVE STATS TO JSON OBJECT

function saveCharacter() {
    // save stats to JSON object

    Armor = document.getElementById("armor").value;
    charname = document.getElementById("charname").value;
    Athletics = document.getElementById("athletics").value;
    Brawl = document.getElementById("brawl").value;
    Dexterity = document.getElementById("dexterity").value;
    Dodge = document.getElementById("dodge").value;
    Firearms = document.getElementById("firearms").value;
    Melee = document.getElementById("melee").value;
    Stamina = document.getElementById("stamina").value;
    Strength = document.getElementById("strength").value;
    Subterfuge = document.getElementById("subterfuge").value;
    Wits = document.getElementById("wits").value;

    let character = new NewCharacter(
        charname,
        Strength,
        Dexterity,
        Stamina,
        Wits,
        Athletics,
        Brawl,
        Melee,
        Firearms,
        Dodge,
        Subterfuge,
        Armor,
    );

    localStorage[`WtA20Chars${charname}`] = JSON.stringify(character);

    //  addCharactertoList();
    //  function not working - leave disabled
}

function loadCharacter() {
    // Load stored character stats
    // asks data from user

    let promptanswer = prompt("Load which character?");
    let loading = `WtA20Chars${promptanswer}`;

    try {
        if (loading == "") throw "name";
    } catch (err) {
        document.getElementById("charname").value = "Give a " + err;
        return;
    }

    let character = JSON.parse(window.localStorage.getItem(loading));

    charname = character.Name;
    Strength = character.Strength;
    Dexterity = character.Dexterity;
    Stamina = character.Stamina;
    Wits = character.Wits;
    Athletics = character.Athletics;
    Brawl = character.Brawl;
    Dodge = character.Dodge;
    Firearms = character.Firesarms;
    Melee = character.Melee;
    Subterfure = character.subterfuge;
    Armor = character.Armor;

    document.getElementById("charname").value = charname;
    document.getElementById("strength").value = Strength;
    document.getElementById("dexterity").value = Dexterity;
    document.getElementById("stamina").value = Stamina;
    document.getElementById("wits").value = Wits;
    document.getElementById("athletics").value = Athletics;
    document.getElementById("brawl").value = Brawl;
    document.getElementById("dodge").value = Dodge;
    document.getElementById("firearms").value = Firearms;
    document.getElementById("melee").value = Melee;
    document.getElementById("subterfuge").value = Subterfuge;
    document.getElementById("armor").value = Armor;

}

function deleteCharacter() {
    // Delete stored character stats
    // asks data from user

    let promptanswer = prompt("Delete which character?");
    let loading = `WtA20Chars${promptanswer}`;
    localStorage.removeItem(loading);

}

function deleteAllCharacters() {
    let promptanswer = prompt("Type YES to delete all saved characters.");

    if (promptanswer == "YES") {
        localStorage.clear();
    } else if (promptanswer != "YES") {
        return;
    }
}


///////////////////
/// NOT WORKING ///
///////////////////

function listCharacters() {
    // NOT WORKING
    // Show list of saved characters’ names

    console.log(Object.entries(WtA20Chars));

    document.getElementById("message").innerHTML = JSON.stringify(
        Object.entries(WtA20Chars)
    );
}

function addCharactertoList() {
    // Add charname to array of saved names
    // NOT WORKING

    Object.assign(WtA20Chars, charname);
    localStorage[WtA20Chars] = JSON.stringify(WtA20Chars);
    console.log("Character array is: " + JSON.stringify(character, false, 1));
    console.log(
        "Saved characters array is: " + JSON.stringify(WtA20Chars, false, 1)
    );
}

