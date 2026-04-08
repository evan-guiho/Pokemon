class Pokemon {
    static all_pokemons = {};

    /////////////////////////////////////////////////////////////////////////////////////
    ////////////////////// Constructeur de l'objet Pokemon //////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
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
        1. Création d'une liste vide pour récupérer les types du Pokémon
        
        2. Récupération des types dans pokemon_types grâce à find()
        
        3. Boucle pour ajouter tous les objets dans la liste
        
        4. Retourne la liste complète
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
        1. Création d'une liste vide pour récupérer les objets Attack
        
        2. Récupération des objets avec all_attack
        
        3. Ajout des objets dans la liste
        
        4. Retourne la liste pleine
        */
        let liste_attack = [];

        let attack_rapide = Attack.all_attacks[this.name_fast_attack];
        let attack_lente = Attack.all_attacks[this.name_charged_attack];

        liste_attack.push(attack_lente);
        liste_attack.push(attack_rapide);

        return liste_attack;
    }
    /////////////////////////////////////////////////////////////////////////////////////
    //////////// Méthode qui retourne une liste de Pokémon les plus faibles /////////////
    /////////////////////////////////////////////////////////////////////////////////////
    getWeakestEnemies(attackName){
        /*
        1. Pour chaque attaque, compare le nom avec celui donné
            1.1 Si le nom est identique, alors récupération du type de l'attaque
        
        2. Récupération du tableau des faiblesses du type trouvé

        3. Pour chaque Pokémon, parcourt les faiblesses par coefficient
            3.1 Parcourt les coefficients par type (dictionnaire clé : coeff, value : liste des types)
            3.2 Parcourt les types du Pokémon
            3.3 Si le type du Pokémon est égal au type t, alors le coeff du type est multiplié suivant la règle
                (règle : coeff * coeff = coeff de l'attaque)
            3.4 Ajout du nouveau coeff dans le dictionnaire
        
        4. Parcours pour trouver le maximum dans le dictionnaire

        5. Retour de la liste des Pokémon dont le coeff est le plus grand.
        */

        // Déclaration des variables utiles
        const normalizedAttackName = estChaineCarac(attackName); // Test de la chaîne
        let weakestEnemies = {}; // Dictionnaire clé : coefficient, value : noms des Pokémon
        let result = []; // Liste retournée contenant les Pokémon
        let maxTemp = 0; // Maximum temporaire utilisé pour trouver le max
        let faiblesse;  // Variable qui prend un dictionnaire clé : coefficient, value : type
        let typeAttack; // Variable du type de l'attaque
        let coeff = 1; // Coefficient initial pour la puissance de l'attaque

        // Boucle de recherche dans les attaques pour récupérer le type
        for(let attack in Attack.all_attacks){
            if(Attack.all_attacks[attack].name == normalizedAttackName){
                typeAttack = Attack.all_attacks[attack].type;
            }
        }

        // Récupération du dictionnaire clé : coefficient, value : liste de types
        faiblesse = Type.all_types[typeAttack].prepaTableau();

        // Boucle de parcours de tous les Pokémon
        for(let poke in Pokemon.all_pokemons){
            // Boucle de parcours de tous les coefficients
            for(let c in faiblesse){
                // Boucle de parcours de tous les types liés au coefficient
                for(const t of faiblesse[c]){
                    // Parcours des types du Pokémon
                    for(const typePoke of Pokemon.all_pokemons[poke].type_name){
                        // Condition : si le type correspond, alors coeff * coeff = coeff de dégât
                        if(typePoke === t){
                            coeff = coeff * c;
                        }
                    }
                }
            }
            // Test si le coefficient est déjà présent dans le dictionnaire
            if(!(coeff in weakestEnemies)){
                weakestEnemies[coeff] = [Pokemon.all_pokemons[poke].name];
            }
            else{
                weakestEnemies[coeff].push(Pokemon.all_pokemons[poke].name);
            }
            // Remise à la valeur initiale du coefficient pour le prochain Pokémon
            coeff = 1;
        }
        // Recherche du maximum
        for(let max in weakestEnemies){
            if(max > maxTemp){
                maxTemp = max;
                result = weakestEnemies[max];
            }
        }
        // Retour de la liste des Pokémon les plus faibles à l'attaque
        return result;
    }
    

    /////////////////////////////////////////////////////////////////////////////////////
    ////////////////////// Méthode qui convertit l'objet en texte ///////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    toString() {
        return this.name + " : #" + this.id_pokemon + ", [" + this.type_name + "], " + "[ STA: " + this.stamina + ", ATK: " + this.base_attack + ", DEF:" + this.base_defense + "], Rapides = " +  this.name_fast_attack + ", Chargés = " + this.name_charged_attack + "";
    }

    
}


/////////////////////////////////////////////////////////////////////////////////////
/////////////// Fonction qui remplit la variable de classe Pokemon //////////////////
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

/////////////////////////////////////////////////////////////////////////////////////
///////////// Fonction qui vérifie et formate une chaîne de caractères /////////////
/////////////////////////////////////////////////////////////////////////////////////

function estChaineCarac(chaineString){
    if(typeof chaineString === "string"){
        let chaineNettoyee = chaineString.trimEnd().trimStart().replace(/\s+/g, " ");

        if(chaineNettoyee.length === 0){
            return "";
        }

        chaineNettoyee = chaineNettoyee
            .split(" ")
            .map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1).toLowerCase())
            .join(" ");

        return chaineNettoyee;
    }
    else{
        return false;
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////// Fonction qui affiche toutes les attaques d'un type donné ///////////////
/////////////////////////////////////////////////////////////////////////////////////

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

