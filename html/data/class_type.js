class Type{
    constructor(TypeAttaque){
        this.TypeAttaque = TypeAttaque;
    }

    prepaTableau(){
        let TabDef = type_effectiveness[this.TypeAttaque];
        let Dico = {};
        for(let cle in TabDef){
            if(TabDef[cle] in Dico){
                Dico[cle].push(cle);
            }
            else{
                Dico[cle] = [cle];
            }
        }
        return Dico;
    }

    toString(){
        let dictionnaire = this.prepaTableau();
        return this.TypeAttaque + " : " + dictionnaire.toString();
    }

    
}