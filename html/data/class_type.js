class Type{

    static all_types = {};

    constructor(TypeAttaque){
        this.TypeAttaque = TypeAttaque;
    }

    /////////////////////////////////////////////////////////////////////////////////////
    /// Fonction qui prépare un dictionnaire contenant l'éfficacité et les types liés ///
    /////////////////////////////////////////////////////////////////////////////////////

    prepaTableau(){
        /*
            1. Récupération du dictionnaire liés au type

            2. initialisation d'un dictionnaire

            3. parcours du tableau type - efficacité

            4. Si l'éfficacité appartient au dico on l'initialise
            Sinon on ajoute le type
        */
        let TabDef = type_effectiveness[this.TypeAttaque];
        let Dico = {};
        for(let cle in TabDef){
            let efficacite = TabDef[cle];

            if(!(efficacite in Dico)){
                Dico[efficacite] = [cle];   
            }
            else{
                Dico[efficacite].push(cle);
            }
        }
        return Dico;
    }

    toString(){
        let dictionnaire = this.prepaTableau();
        return this.TypeAttaque + " : " + JSON.stringify(dictionnaire);
    }
}



/////////////////////////////////////////////////////////////////////////////////////
///////////////////// Fonction qui génére un tableau d'objet Type ///////////////////
/////////////////////////////////////////////////////////////////////////////////////

function fill_types(){
    /*
        1. Récupèration de tous les types de pokemon dans type_effectiveness

        2. Parcours du dictionnaire pour récupérer les types

        3. Création d'une instance de la class Type

        4. ajout du nom du type lier à l'instrance de la class Type

    */
    let listeTypes = type_effectiveness;

    for(let type in listeTypes){
       let pokeType = new Type(type);
       Type.all_types[type] = pokeType;
    }
}