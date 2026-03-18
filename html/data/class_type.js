class Type{
    constructor(TypeAttaque){
        this.TypeAttaque = TypeAttaque;
    }

    prepaTableau(){
        let TabDef = type_effectiveness[this.TypeAttaque];
        console.log(JSON.stringify(TabDef));
        let Dico = {};
        for(let cle in TabDef){
            let efficacite = TabDef[cle];

            if(!(efficacite in Dico)){
                Dico[efficacite] = [];
                Dico[efficacite].push(cle);
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