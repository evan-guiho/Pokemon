/** MESSAGE A YOANN 
 * tu vas voir des comms de connards c'est normal
 * c'est des mémos pour que je n'oublie pas quand je ferrais le css
 * Bon courage 
 * Normalement c'est compréhensifs si tu dois changer des trucs
 * J'ai utiliser la docs et claude donc c'est asser propre
*/

$(document).ready(function() {
    fill_types();
    fill_attacks();
    fill_pokemon();

    const itemsPerPage = 25; // Demander par les profs
    let currentPage = 1; // mettre a 1 car c'est plus beau
    const pageMax = Math.ceil(Object.keys(Pokemon.all_pokemons).length / itemsPerPage); // Fais en sorte que le nombre de page existe par rapport au nombre de pokemons
    const pokeTot = Math.ceil(Object.keys(Pokemon.all_pokemons).length); // nombre tot de pokemons
    function afficherPokemons() {
        $('#AllPokemonsTable').empty(); // vider le tableau avant de le reremplir

        const pokemons = Object.values(Pokemon.all_pokemons).slice( // Fais en sorte qu'une page fais la taille demandé
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        pokemons.forEach(function(poke) { // Insert tout dans le tableau 
            let row = $('<tr>');
            // Affiche l'id
            row.append($('<td>').text(poke.id_pokemon));
            // faire en sorte que l'id s'affiche => 1 = 001
            let id_str = String(poke.id_pokemon).padStart(3, '0');
            // afficje l'image
            row.append($('<td>').append($('<img>').attr('src', 'webp/sprites/' + id_str + 'MS.webp').attr('alt', poke.name)));
            // Affiche le nom
            row.append($('<td>').text(poke.name));
            // Affiche le(s) type(s) 
            row.append($('<td>').text(poke.type_name.join(', ')));
            $('#AllPokemonsTable').append(row);
        });

        majBoutons();
    }

    $('.suivant').click(function() { // Fais en sorte que d'incrémenter la page
        if (currentPage < pageMax) {
            currentPage++;
            afficherPokemons();
        }
        scrollTo({                  // PERMET DE SCROLL QUAND ON CHANGE DE PAGE A CHANGER LORS DU CSS
            top: 100,
            behavior: "smooth",
        });
    });

    $('.precedent').click(function() { // Fais en sorte que de désincrémenter la page
        if (currentPage > 1) {
            currentPage--;
            afficherPokemons();
        }
        scrollTo({                  // PERMET DE SCROLL QUAND ON CHANGE DE PAGE A CHANGER LORS DU CSS
            top: 100,
            behavior: "smooth",
        });
    });

    function majBoutons() {         // PERMET DE FAIRE DISPARAITRE LES BUTTONS A CHANGER LORS DU CSS (faire en sorte que les buttons soit dans un grid pour aucun changements)
        if (currentPage === 1) {
            $('.precedent').hide();
        } else {
            $('.precedent').show();
        }

        if (currentPage === pageMax) {
            $('.suivant').hide();
        } else {
            $('.suivant').show();
        }
    }
    // A CHANGER QUAND LES FILTRES EXISTERONT ( j'ai un peu la flemme la )
    const nb = Object.keys(Pokemon.all_pokemons).length;
    if (nb <= 1) {
        $('#nbPokemons').text(nb + ' Pokémon trouvé');
    } else {
        $('#nbPokemons').text(nb + ' Pokémons trouvés');
    }

    // Remplir les checkboxes de types
    const types = Object.keys(Type.all_types);
    types.forEach(function(type) {
        // Créer un label pour le type
        let label = $('<label>');
        // Créer une checkbox pour le type
        let checkbox = $('<input>').attr('type', 'checkbox').attr('value', type).attr('name', 'type');
        // Ajouter la checkbox et le nom du type au label
        label.append(checkbox);
        label.append(' ' + type);
        // Ajouter le label à la div des filtres
        $('#filtreTypes').append(label);
    });

    // Autocomplete les attaques rapides
    const fastAttackNames = fast_moves.map(m => m.name);
    let selectedAttaques = [];
    // c'est pas beau mais osef ça le sera après 
    $('#searchAttaque').on('input', function() {
        // Query sert à récupérer ce que l'utilisateur tape dans la barre de recherche
        const query = $(this).val().toLowerCase();
        // Vider les suggestions précédentes
        $('#suggestionsAttaque').empty();
        // Si la query est vide, ne rien faire
        if (query === '') return;
        // Filtrer les attaques rapides pour trouver celles qui correspondent à la query
        const suggestions = fastAttackNames.filter(name => name.toLowerCase().includes(query));

        // Afficher les suggestions
        suggestions.forEach(function(name) {
            if (selectedAttaques.includes(name)) return; // ne pas proposer déjà sélectionnées

            let li = $('<li class="filtresAttaque">').text(name).css('cursor', 'pointer'); // A CHANGER DANS LE CSS
            li.click(function() { // => c'est une liste donc adapter le css
                // Ajouter l'attaque sélectionnée à la liste des attaques sélectionnées
                selectedAttaques.push(name);
                // Vider la barre de recherche et les suggestions, puis afficher les attaques sélectionnées
                $('#searchAttaque').val('');
                $('#suggestionsAttaque').empty();
                afficherSelectedAttaques();
            });
            // Ajouter la suggestion à la liste des suggestions
            $('#suggestionsAttaque').append(li);
        });
    });

    // Affiche les attacks une fois clicker dessus avec un boutons suppr
    function afficherSelectedAttaques() {
        // Vider les attaques sélectionnées précédentes
        $('#selectedAttaques').empty();
        // Afficher les attaques sélectionnées avec un bouton de suppression
        selectedAttaques.forEach(function(name) {
            // Créer un span pour l'attaque sélectionnée
            let tag = $('<span>').text(name);
            // Ajouter un bouton de suppression à l'attaque sélectionnée
            let btnSuppr = $('<button>').text('x').click(function() {
                selectedAttaques = selectedAttaques.filter(a => a !== name);
                afficherSelectedAttaques();
            });
            // Ajouter le bouton de suppression au tag de l'attaque sélectionnée
            tag.append(btnSuppr);
            // Ajouter l'attaque sélectionnée à la div des attaques sélectionnées
            $('#selectedAttaques').append(tag);
        });
    }

    // Fais en sorte que le div filtre soit pas visible au début
    $('#filtres').hide();
    // Fais en sorte que le div filtre soit visible ou pas quand on click sur le bouton
    $('#toggleFiltre').click(function() {
        $('#filtres').slideToggle(300); // c'est smooth
    });
    afficherPokemons(); // affichage initial
});