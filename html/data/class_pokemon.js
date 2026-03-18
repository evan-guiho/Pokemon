class Pokemon {
    constructor(id_pokemon, name, stamina, base_attack, base_defense, type_name, name_fast_attack, name_charged_attack) {
        this.id_pokemon = id_pokemon;
        this.name = name;
        this.stamina = stamina;
        this.base_attack = base_attack;
        this.base_defense = base_defense;
        this.type_name = type_name;
        this.name_fast_attack = name_fast_attack;
        this.name_charged_attack = name_charged_attack;
    }

    toString() {
        return this.name + " : #" + this.id_pokemon + ", [" + this.type_name + "], " + "[ STA: " + this.stamina + ", ATK: " + this.base_attack + ", DEF:" + this.base_defense + "], Rapides = " +  this.name_fast_attack + ", Chargés = " + this.name_charged_attack + "";
    }

    
}

let all_pokemons = {};

function getTypes(){
    let all_types = {};
    for(let type in pokemon_types){
        let typeName = pokemon_types[type];
        let typeObj = new Type(typeName);
        all_types[typeName] = typeObj;
    }

    return all_types;
}

function getAttacks(){
    let all_attacks = {};
    for (let move of fast_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new Attack(move.id, move.name, typeObj, move.power, move.duration);    
            all_attacks[move.id] = attack;
        }
    }

    for (let move of charged_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new Attack(move.id, move.name, typeObj, move.power, move.duration);    
            all_attacks[move.id] = attack;
        }
    }
    return all_attacks;
}
