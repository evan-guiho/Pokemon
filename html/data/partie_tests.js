


function getPokemonsByType(typeName){
    /*
    recup vriable all_pke
    chercher dedans les poks avec le type demander
    chercher dans la liste des type du poke
    afficher si le type est bon le poke
    sinon rien    
    */
    chaine = estChaineCarac(typeName);
    if(typeof chaine == "string"){

        let boucle = 1;
        let all_poke = Pokemon.all_pokemons;

        for(let poke in all_poke){
            for(let i = 0; i < all_poke[poke].type_name.length; i++){
                if(all_poke[poke].type_name[i] == chaine){
                    if(boucle === 1){
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"er pokémon");
                    }
                    else{
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"éme pokémon");
                    }
                    boucle += 1;
                }
            }
        }    
    }
    else{
        console.log("Impossible de chercher. erreur de saisie. PANIC !!!!");
    }
    
}

function getPokemonsByAttack(attackName){
    /*
    recup vriable all_pke
    chercher dedans les poks avec l'attack demander
    chercher dans la liste des charged_attack puis fast_attack du poke
    afficher si l'attack est bon le poke
    sinon rien    
    */
    chaine = estChaineCarac(attackName);
    if(typeof chaine == "string"){

        let boucle = 1;
        let all_poke = Pokemon.all_pokemons;

        for(let poke in all_poke){
            for(let i = 0; i < all_poke[poke].name_charged_attack.length; i++){
                if(all_poke[poke].name_charged_attack[i] == attackName){
                    if(boucle === 1){
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"er pokémon");
                    }
                    else{
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"éme pokémon");
                    }
                    boucle += 1;
                }
            }
            for(let i = 0; i < all_poke[poke].name_fast_attack.length; i++){
                if(all_poke[poke].name_fast_attack[i] == attackName){
                    if(boucle === 1){
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"er pokémon");
                    }
                    else{
                        console.log("Voici le "+all_poke[poke].toString()+" du "+boucle+"éme pokémon");
                    }
                    boucle += 1;
                }
            }
        }    
    }
    else{
        console.log("Impossible de chercher. erreur de saisie. PANIC !!!!");
    }
    
}

function sortPokemonsByTypeThenName(){
    /*
    recup vriable all_pke
    trier les poks par type puis par nom
    afficher les poks dans l'ordre
    */

    let all_poke = Object.values(Pokemon.all_pokemons);
    all_poke.sort((a, b) => {
        
        if (a.type_name[0] < b.type_name[0]) {
          return -1;
        }
        if (a.type_name[0] > b.type_name[0]) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
    });

    all_poke.forEach((poke, index) => {
        console.log(`${index + 1}. ${poke.toString()}`);
    });
}

function getBestFastAttacksForEnemy(pokemonEnnemi, print = false) {
    /*
    recup vriable all_pke
    chercher dedans les poks avec le type demander
    chercher dans la liste des type du poke
    afficher si le type est bon le poke
    sinon rien    
    */
}