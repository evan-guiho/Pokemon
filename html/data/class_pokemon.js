class Pokemon {
    static all_pokemons = {};

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

    /////////////////////////////////////////////////////////////////////////////////////
    //////////////// Méthode qui retourne une liste d'objets Type ///////////////////////
    /////////////////////////////////////////////////////////////////////////////////////

    getTypes(){
        /*
        1. Création d'une liste vide pour récupérer les types du poke
        
        2. Récupération des types dans pokemon_types grâce à find()
        
        3. Boucle pour ajouter tous les objs dans la liste
        
        4. Retroune la liste pleine
        */
        let listeDesPokeType = [];
        let pokeType = pokemon_types.find((item) => item.pokemon_id === this.id_pokemon).type;
        for(type in pokeType){
            listeDesPokeType.push(Type.all_types[type]);
        }
        return listeDesPokeType;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //////////////// Méthode qui retourne une liste d'objets Attack /////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    
    getAttacks(){
        /*
        1. Création d'une liste vide pour récupérer les objs Attack
        
        2. Récupération des objs avec all_attack
        
        3. Ajout dans la liste des objs
        
        4. Retourne la liste pleine
        */
        let liste_attack = [];

        let attack_rapide = Attack.all_attacks[this.name_fast_attack];
        let attack_lente = Attack.all_attacks[this.name_charged_attack];

        liste_attack.push(attack_lente);
        liste_attack.push(attack_rapide);

        return liste_attack;
    }

    toString() {
        return this.name + " : #" + this.id_pokemon + ", [" + this.type_name + "], " + "[ STA: " + this.stamina + ", ATK: " + this.base_attack + ", DEF:" + this.base_defense + "], Rapides = " +  this.name_fast_attack + ", Chargés = " + this.name_charged_attack + "";
    }

    
}