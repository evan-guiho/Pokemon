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

    /*
    getWeakestEnemies(attackName){
    
        récupérer les pokémons qui sont les plus faible à l'attaque
        
        
        let chaine = estChaineCarac(attackName);
        let all_poke_faible = {};
        
        if(typeof chaine === "string"){
            for(let attack in Attack.all_attacks){
                if(Attack.all_attacks[attack].name === chaine){
                    attackType = Attack.all_attacks[attack].type;
                    break;
                }
            }
            for(let type in Type.all_types){
                if(Type.all_types[type].TypeAttaque === attackType){
                    dicoTypeFaiblesse = Type.all_types[type].prepaTableau();
                    break;
                }
            }
            for(let poke in Pokemon.all_pokemons){
                for(let TypeEfficace in dicoTypeFaiblesse[1.5]){
                    let trouve = Pokemon.all_pokemons[poke].type_name.find((elt) => elt === TypeEfficace);
                    if(trouve != undefined){
                        if(!poke in all_poke_faible){
                            all_poke_faible[poke] = 1;
                        }
                        else{
                            all_poke_faible[poke] = 2;
                        }
                    }
                }
            }
            return all_poke_faible;
        }
        else{
            console.log("Impossible de chercher - Erreur de saisie - PANIC !!!!");
        }
    }
    */
    toString() {
        return this.name + " : #" + this.id_pokemon + ", [" + this.type_name + "], " + "[ STA: " + this.stamina + ", ATK: " + this.base_attack + ", DEF:" + this.base_defense + "], Rapides = " +  this.name_fast_attack + ", Chargés = " + this.name_charged_attack + "";
    }

    
}


/////////////////////////////////////////////////////////////////////////////////////
/////////////// Fonction qui remplies la variable de class Pokemon //////////////////
/////////////////////////////////////////////////////////////////////////////////////

function fill_pokemon(){

    let liste_pokemon = pokemons;

    for(poke in liste_pokemon){
        let type = pokemon_types.find((item) => item.pokemon_id === liste_pokemon[poke].pokemon_id && item.form === "Normal");
        if(type != undefined){
            type = type.type;
            let fast_attack = pokemon_moves.find((item) => item.pokemon_id === liste_pokemon[poke].pokemon_id && item.form === "Normal").fast_moves;
            let charged_attack = pokemon_moves.find((item) => item.pokemon_id === liste_pokemon[poke].pokemon_id && item.form === "Normal").charged_moves;

            let pokemon = new Pokemon(liste_pokemon[poke].pokemon_id,liste_pokemon[poke].pokemon_name,liste_pokemon[poke].base_stamina,liste_pokemon[poke].base_attack,liste_pokemon[poke].base_defense,type,fast_attack,charged_attack);
            
            Pokemon.all_pokemons[liste_pokemon[poke].pokemon_id] = pokemon;
        }
        
    }
}

function estChaineCarac(chaineString){
    if(typeof chaineString === "string"){
        chaineString = chaineString.charAt(0).toUpperCase() + chaineString.slice(1).toLowerCase();
        return chaineString;
    }
    else{
        return false;
    }
}

function getAttacksByType(typename){
    chaine = estChaineCarac(typename);

    if(typeof chaine === "string"){
        let all_attack = Attack.all_attacks;
        let boucle = 1;
        for(let attack in all_attack){
            if(all_attack[attack].type === chaine){
                if(boucle === 1){
                    console.log("Ici le "+all_attack[attack].toString()+" de la 1er attaque");
                    boucle += 1;
                }
                else{
                    console.log("Ici le "+all_attack[attack].toString()+" de la "+ boucle + "ème attaque");
                    boucle += 1;
                }
            }
            
        }
    }
    else{
        console.log("Impossible de chercher - erreur de saisie - PANIC !!!!");
    }
}

