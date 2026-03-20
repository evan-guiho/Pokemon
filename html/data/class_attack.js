class Attack {
    static all_attacks = {};
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

function fill_attacks() {
    /*
    for (let move of fast_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new Attack(move.id, move.name, typeObj, move.power, move.duration);    
            Attack.all_attacks[move.id] = attack;
        }
    }

    for (let move of charged_moves) {
        let typeName = pokemon_types[move.type];
        let typeObj = all_types[typeName];
        if(typeObj){
            let attack = new Attack(move.id, move.name, typeObj, move.power, move.duration);    
            Attack.all_attacks[move.id] = attack;
        }
    }
    C'EST QUOI CE BORDEL CHEFFFFF
    */

    let liste_fast_move = fast_moves;
    let liste_charged_move = charged_moves;

    for(move in liste_fast_move){
        let pokeAttack = new Attack(liste_fast_move[move].move_id,liste_fast_move[move].name,liste_fast_move[move].type,liste_fast_move[move].power,liste_fast_move[move].duration);
        Attack.all_attacks[liste_fast_move[move].move_id] = pokeAttack; 
    }
    for(move in liste_charged_move){
        let pokeAttack = new Attack(liste_charged_move[move].move_id,liste_charged_move[move].name,liste_charged_move[move].type,liste_charged_move[move].power,liste_charged_move[move].duration);
        Attack.all_attacks[liste_charged_move[move].move_id] = pokeAttack; 
    }
    

}