fill_types();
fill_attacks();
fill_pokemon();

const pokemonA = Object.values(Pokemon.all_pokemons).find((p) => p.name === "Squirtle");
const pokemonNameB = "Charmander";
getBestFastAttacksForEnemy.call(pokemonA, true, pokemonNameB);