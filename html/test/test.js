fill_types();
fill_attacks();
fill_pokemon();

// Squirtle (Water) vs Charmander (Fire) → Water est super efficace contre Fire (×1.6)
const pokemonA = Object.values(Pokemon.all_pokemons).find((p) => p.name === "Squirtle");
const pokemonNameB = "Charmander";
getBestFastAttacksForEnemy.call(pokemonA, true, pokemonNameB);