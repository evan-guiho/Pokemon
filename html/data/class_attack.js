class Attack {
    constructor(id_attack, name, type, power, duration ) {
        this.id_attack = id_attack;
        this.name = name;
        this.type = type;
        this.power = power;
        this.duration = duration;
    }

    toString() {
        return this.name + " : #" + this.id_attack + ", " + this.type + ", " + this.power + ", " + this.duration + "ms"; ;
    }


}

let all_attacks = {};

function fill_attacks() {
    for (let move of fast_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new attack(move.id, move.name, typeObj, move.power, move.duration);    
            all_attacks[move.id] = attack;
        }
    }

    for (let move of charged_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new attack(move.id, move.name, typeObj, move.power, move.duration);    
            all_attacks[move.id] = attack;
        }
    }

    return all_attacks;
}