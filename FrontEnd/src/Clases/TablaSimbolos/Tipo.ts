export enum tipo{
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID,
    INDEFINIDO
}

export default class Tipo{
    public type: tipo;
    public stype: string;

    constructor(stype: string){
        this.stype = stype;
        this.type = this.getTipo(stype);
    }

    getTipo(stype: string): tipo{
        let auxiliar = tipo.INDEFINIDO;
        if(stype == 'ENTERO'){
            auxiliar = tipo.ENTERO;
        }else if(stype == 'DECIMAL'){
            auxiliar = tipo.DECIMAL;
        }else if(stype == 'BOOLEANO'){
            auxiliar = tipo.BOOLEANO;
        }else if(stype == 'CARACTER'){
            auxiliar = tipo.CARACTER;
        }else if(stype == 'CADENA'){
            auxiliar = tipo.CADENA;
        }else if(stype == 'VOID'){
            auxiliar = tipo.VOID;
        }
        return auxiliar;
    }

    getStype():string{
        return this.stype;
    }
}