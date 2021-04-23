export enum tipo{
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID
}

export default class Tipo{
    public type: tipo;
    public stype: string;

    constructor(stype: string){
        this.stype = stype;
        this.type = this.getTipo(stype);
    }

    getTipo(stype: string): tipo{
        
        if(stype == 'ENTERO'){
            return tipo.ENTERO;
        }else if(stype == 'DECIMAL'){
            return tipo.DECIMAL;
        }else if(stype == 'BOOLEANO'){
            return tipo.BOOLEANO;
        }else if(stype == 'CARACTER'){
            return tipo.CARACTER;
        }else if(stype == 'CADENA'){
            return tipo.CADENA;
        }else if(stype == 'VOID'){
            return tipo.VOID;
        }
        
    }

    getStype():string{
        return this.stype;
    }
}