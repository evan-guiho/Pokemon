
$(document).ready(function() {
    fill_types();
    fill_attacks();
    fill_pokemon();

    const itemsPerPage = 25; // Demander par les profs
    let currentPage = 1; // mettre a 1 car c'est plus beau
    const pageMax = Math.ceil(Object.keys(Pokemon.all_pokemons).length / itemsPerPage); // Fais en sorte que le nombre de page existe par rapport au nombre de pokemons
    let currentPageMax = pageMax;
    const pokeTot = Math.ceil(Object.keys(Pokemon.all_pokemons).length); // nombre tot de pokemons
    function afficherPokemons() {
        $('#AllPokemonsTable').empty(); // vider le tableau avant de le reremplir
        currentPageMax = pageMax;

        const pokemons = Object.values(Pokemon.all_pokemons).slice( // Fais en sorte qu'une page fais la taille demandé
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        /** EN TRAVAUX 
         * Faire en sorte que l'on puisse appuyer sur un pokemons pour ouvrir un popup avec ses infos
         * CSS A CHANGER pour que ça l'affiche au milieu 
        */
        pokemons.forEach(function(poke) { // Insert tout dans le tableau 
            let row = $('<tr>').addClass('infoPokemon').attr('data-id', poke.id_pokemon);
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
        if (currentPage < currentPageMax) {
            currentPage++;
            afficherPokemonsFiltres();
        }
        scrollTo({                  // PERMET DE SCROLL QUAND ON CHANGE DE PAGE A CHANGER LORS DU CSS
            top: 100,
            behavior: "smooth",
        });
    });

    $('.precedent').click(function() { // Fais en sorte que de désincrémenter la page
        if (currentPage > 1) {
            currentPage--;
            afficherPokemonsFiltres();
        }
        scrollTo({                  // PERMET DE SCROLL QUAND ON CHANGE DE PAGE A CHANGER LORS DU CSS
            top: 100,
            behavior: "smooth",
        });
    });

    function majBoutons() {
        $('.precedent').prop('disabled', currentPage === 1);
        $('.suivant').prop('disabled', currentPage >= currentPageMax);
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
    $('#popup').hide();
    // Fais en sorte que le div filtre soit visible ou pas quand on click sur le bouton
    $('#toggleFiltre').click(function() {
        $('#filtres').slideToggle(300); // c'est smooth
    });
    //mets de base les btn en actif/inactif
    $('.precedent').prop('disabled', true);
    $('.suivant').prop('disabled', false);
    afficherPokemons(); // affichage initial


    // Fermer le popup
    $('#closePopup').click(function() {
        $('#popup').hide();
    });

    // Variable pour tracker le pokemon actuel dans le popup
    let currentPopupId = null;

    // Ouvrir le popup au clic sur une ligne
    function ouvrirPopup(id) {
        currentPopupId = id;
        const poke = Pokemon.all_pokemons[id];
        const id_str = String(poke.id_pokemon).padStart(3, '0');

        // Infos de base
        /**
         * En gros va chercher les infos du pokemon et les affiche dans le popup
         */
        $('#popupNom').text(poke.name); 
        $('#popupSprite').attr('src', 'webp/sprites/' + id_str + 'MS.webp');
        $('#popupAtk').text('Attaque : ' + poke.base_attack);
        $('#popupDef').text('Défense : ' + poke.base_defense);
        $('#popupSta').text('Endurance : ' + poke.stamina);
        $('#popupType').text('Type : ' + poke.type_name.join(', '));

        // Faiblesses: 1re ligne = types attaquants, 2e ligne = multiplicateurs
        $('#faiblessesHead').empty();
        $('#faiblessesTable').empty();

        const attackTypes = Object.keys(Type.all_types);
        const headerRow = $('<tr>');
        const valueRow = $('<tr>');

        attackTypes.forEach(function(attackType) {
            let multiplier = 1;

            poke.type_name.forEach(function(defenderType) {
                const value = type_effectiveness[defenderType] && type_effectiveness[defenderType][attackType];
                multiplier *= (value !== undefined ? value : 1);
            });

            const roundedMultiplier = Math.round(multiplier * 1000) / 1000;
            const displayMultiplier = String(roundedMultiplier).replace('.', ',');
            let weaknessClass = 'faiblesse-neutre';

            if (roundedMultiplier >= 2) {
                weaknessClass = 'faiblesse-tres-bonne';
            } else if (roundedMultiplier > 1) {
                weaknessClass = 'faiblesse-bonne';
            } else if (roundedMultiplier <= 0.5) {
                weaknessClass = 'faiblesse-tres-faible';
            } else if (roundedMultiplier < 1) {
                weaknessClass = 'faiblesse-faible';
            }

            headerRow.append($('<th>').text(attackType));
            valueRow.append($('<td>').addClass(weaknessClass).text('x' + displayMultiplier));
        });

        $('#faiblessesHead').append(headerRow);
        $('#faiblessesTable').append(valueRow);

        // Attaques rapides
        $('#atkRapides').empty(); // Vider les attaques rapides précédentes
        poke.name_fast_attack.forEach(function(atk) {
            $('#atkRapides').append($('<span>').text(atk)); // Afficher les attaques rapides du pokémon
        });

        // Attaques chargées
        $('#atkChargees').empty(); // Vider les attaques chargées précédentes
        poke.name_charged_attack.forEach(function(atk) {
            $('#atkChargees').append($('<span>').text(atk)); // Afficher les attaques chargées du pokémon
        });

        // Revenir sur l'onglet Aperçu à chaque ouverture
        $('#infoPoke').show();
        $('#atkConnu').hide();
        $('#btnApercu').addClass('tabActive');
        $('#btnAtk').removeClass('tabActive');

        $('#popup').show();
    }

    // Clic sur une ligne du tableau
    // DANS LE CSS METTRE LE CURSEUR EN POINTER QUAND ON HOVER SUR UNE LIGNE
    $(document).on('click', '.infoPokemon', function() {
        ouvrirPopup($(this).data('id'));
    });

    // Fermer le popup
    $('#closePopup').click(function() {
        $('#popup').hide();
    });

    // Navigation dans le popup
    function allerPokemonSuivant() {
        const ids = Object.keys(Pokemon.all_pokemons); // Récupérer tous les ids de pokémons
        const index = ids.indexOf(String(currentPopupId)); // Trouver l'index du pokémon actuel
        if (index < ids.length - 1) { // Vérifier qu'on n'est pas à la fin de la liste
            ouvrirPopup(parseInt(ids[index + 1]));
        }
    }

    function allerPokemonPrecedent() { // Même chose mais pour le précédent
        const ids = Object.keys(Pokemon.all_pokemons); 
        const index = ids.indexOf(String(currentPopupId));
        if (index > 0) {
            ouvrirPopup(parseInt(ids[index - 1]));
        }
    }

    $('#nextPopupTop, #nextPopupBottom').click(allerPokemonSuivant);
    $('#prevPopupTop, #prevPopupBottom').click(allerPokemonPrecedent);

    // Switch Sprite / 3D
    $('#toggleSprite').click(function() {
        const id_str = String(currentPopupId).padStart(3, '0'); // la meme qu'avant pour le tab
        $('#popupSprite').attr('src', 'webp/sprites/' + id_str + 'MS.webp');
    });

    $('#toggle3d').click(function() {
        const id_str = String(currentPopupId).padStart(3, '0'); // la meme qu'avant pour le tab
        $('#popupSprite').attr('src', 'webp/images/' + id_str + '.webp'); // changer le lien pour les images 3D
    });

    // Onglets Aperçu / Atk connues
    $('#atkConnu').hide();

    $('#btnApercu').click(function() { // faire en sorte que quand on click sur aperçu ça affiche les infos du pokémon et cache les attaques connues
        $('#infoPoke').show();
        $('#atkConnu').hide();
        $('#btnApercu').addClass('tabActive');
        $('#btnAtk').removeClass('tabActive');
    });

    $('#btnAtk').click(function() { // faire en sorte que quand on click sur attaques connues ça affiche les attaques connues du pokémon et cache les infos
        $('#atkConnu').show();
        $('#infoPoke').hide();
        $('#btnAtk').addClass('tabActive');
        $('#btnApercu').removeClass('tabActive');
    });

    // On gère les filtres 
    let filtreNom = '';
    let filtreTypes = [];
    let filtreAttaques = selectedAttaques;

    function afficherPokemonsFiltres() {
        $('#AllPokemonsTable').empty();

        // Récupérer tous les pokémons et les filtrer
        let pokemons = Object.values(Pokemon.all_pokemons).filter(function(poke) {

            // Filtre par nom
            if (filtreNom !== '') {
                if (!poke.name.toLowerCase().includes(filtreNom)) { 
                    return false;
                }
            }

            // Filtre par type
            if (filtreTypes.length > 0) {
                const contenanceType = $('#contenanceType').val();
                if (contenanceType === 'contient') {
                    // Le pokémon doit contenir au moins un des types sélectionnés
                    const aUnType = filtreTypes.some(t => poke.type_name.includes(t));
                    if (!aUnType) return false;
                } else if (contenanceType === 'seulement') {
                    // Le pokémon doit avoir seulement les types sélectionnés
                    const seulementCesTypes = poke.type_name.every(t => filtreTypes.includes(t));
                    if (!seulementCesTypes) return false;
                }
            }

            // Filtre par attaques rapides
            if (selectedAttaques.length > 0) {
                const aAttaque = selectedAttaques.some(atk => poke.name_fast_attack.includes(atk));
                if (!aAttaque) return false;
            }

            return true;
        });
        // Tri
        pokemons = pokemons.sort(function(a, b) {
            let valA, valB;
            if (sortKey === 'id') {
                valA = a.id_pokemon;      
                valB = b.id_pokemon;
            } else if (sortKey === 'name') {
                valA = a.name.toLowerCase();       
                valB = b.name.toLowerCase();
            } else if (sortKey === 'type') {
                valA = a.type_name[0].toLowerCase();
                valB = b.type_name[0].toLowerCase();
            }

            if (valA < valB) {
                if (sortOrder === 'asc') { return -1; } else { return 1; }
            }
            if (valA > valB) {
                if (sortOrder === 'asc') { return 1; } else { return -1; }
            }
            return 0;
        });

        // Mettre à jour le nombre de pokémons trouvés
        const nb = pokemons.length;
        if (nb <= 1) {
            $('#nbPokemons').text(nb + ' Pokémon trouvé');
        } else {
            $('#nbPokemons').text(nb + ' Pokémons trouvés');
        }

        // Pagination sur les pokémons filtrés
        const pageMaxFiltre = Math.max(1, Math.ceil(pokemons.length / itemsPerPage));
        currentPageMax = pageMaxFiltre;
        if (currentPage > pageMaxFiltre) currentPage = 1;

        const slice = pokemons.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        // Afficher les pokémons filtrés dans le tableau
        slice.forEach(function(poke) {
            let row = $('<tr>').addClass('infoPokemon').attr('data-id', poke.id_pokemon); 
            row.append($('<td>').text(poke.id_pokemon));                                    
            let id_str = String(poke.id_pokemon).padStart(3, '0');    
            row.append($('<td>').append($('<img>').attr('src', 'webp/sprites/' + id_str + 'MS.webp').attr('alt', poke.name)));
            row.append($('<td>').text(poke.name));
            row.append($('<td>').text(poke.type_name.join(', ')));
            $('#AllPokemonsTable').append(row);
        });

        majBoutons();
    }

    // Filtre par nom en temps réel via le textarea
    $('#pokemonName').on('input', function() {
        filtreNom = $(this).val().toLowerCase();
        currentPage = 1;
        afficherPokemonsFiltres();
    });

    // Filtre par type via les checkboxes
    $(document).on('change', 'input[name="type"]', function() {
        filtreTypes = $('input[name="type"]:checked').map(function() {
            return $(this).val();
        }).get();
        currentPage = 1;
        afficherPokemonsFiltres();
    });

    // Filtre par attaque (déclenché quand selectedAttaques change)
    // On redéfinit afficherSelectedAttaques pour aussi relancer le filtre
    function afficherSelectedAttaques() {
        $('#selectedAttaques').empty();
        selectedAttaques.forEach(function(name) {
            let tag = $('<span>').text(name);
            let btnSuppr = $('<button>').text('x').click(function() {
                selectedAttaques = selectedAttaques.filter(a => a !== name);
                afficherSelectedAttaques();
                afficherPokemonsFiltres(); // relancer le filtre
            });
            tag.append(btnSuppr);
            $('#selectedAttaques').append(tag);
        });
        afficherPokemonsFiltres(); // relancer le filtre à chaque ajout aussi
    }

    // tri sur l'entête du tableau
    let sortKey = 'id';
    let sortOrder = 'asc';

    $(document).on('click', 'th[data-sort]', function() {
        console.log('clic sur', $(this).data('sort')); // vérifier que ça se déclenche
        const key = $(this).data('sort');

        if (sortKey === key) {
            if (sortOrder === 'asc') {
                sortOrder = 'desc';
            } else {
                sortOrder = 'asc';  
            }
        } else {
            sortKey = key;
            sortOrder = 'asc';
        }

        console.log('sortKey:', sortKey, 'sortOrder:', sortOrder); // vérifier les valeurs
        currentPage = 1;
        afficherPokemonsFiltres();
    });

    

});

