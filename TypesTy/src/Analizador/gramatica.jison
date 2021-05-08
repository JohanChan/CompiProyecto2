%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
entero  [0-9]+
letra  [a-zA-ZÑñ]+
id  {letra} ({letra} | {entero} | "_")*
escapeCar [\'\"\\ntr]
escape \\{escapeCar}
acepta [^\"\\]+
cadena (\"({escape} | {acepta})*\")
decimal [0-9]+("."[0-9]+)?\b

escapeCar2 [\\ntr]
escape2 \\{escapeCar2}
acepta2 [^\'\\]
caracter (\'({escape2}|{acepta2})\')

%%

/* COMENTARIOS */
"//".*             {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}

/* SIMBOLOS DEL PROGRAMA */

"*"                  { console.log("Reconocio : "+ yytext); return 'MULTI'}
"/"                  { console.log("Reconocio : "+ yytext); return 'DIV'}
"--"                 { console.log("Reconocio : "+ yytext); return 'DECRE'}
"++"                 { console.log("Reconocio : "+ yytext); return 'INCRE'}
"-"                  { console.log("Reconocio : "+ yytext); return 'MENOS'}
"+"                  { console.log("Reconocio : "+ yytext); return 'MAS'}
"("                  { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                  { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                  { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                  { console.log("Reconocio : "+ yytext); return 'CORC'}
";"                  { console.log("Reconocio : "+ yytext); return 'PYC'}
","                  { console.log("Reconocio : "+ yytext); return 'COMA'}
"=="                 { console.log("Reconocio : "+ yytext); return 'COMPARAR'}
"="                  { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"!="                 { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}
"<="                 { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">="                 { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"<"                  { console.log("Reconocio : "+ yytext); return 'MENORQ'}
">"                  { console.log("Reconocio : "+ yytext); return 'MAYORQ'}
"||"                 { console.log("Reconocio : "+ yytext); return 'OR'}
"&&"                 { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                  { console.log("Reconocio : "+ yytext); return 'NOT'}
":"                  { console.log("Reconocio : "+ yytext); return 'DOSP'}
"?"                  { console.log("Reconocio : "+ yytext); return 'INTERRC'}
"^"                  { console.log("Reconocio : "+ yytext); return 'POTENCIA'}
"%"                  { console.log("Reconocio : "+ yytext); return 'MOD'}
"{"                  { console.log("Reconocio : "+ yytext); return 'LLAVEA'}
"}"                  { console.log("Reconocio : "+ yytext); return 'LLAVEC'}

/* Palabras reservadas */
"int"               { console.log("Reconocio : "+ yytext); return 'INT'}
"double"            { console.log("Reconocio : "+ yytext); return 'DOUBLE'}
"boolean"           { console.log("Reconocio : "+ yytext); return 'BOOLEAN'}
"char"              { console.log("Reconocio : "+ yytext); return 'CHAR'}
"string"            { console.log("Reconocio : "+ yytext); return 'STRING'}
"if"                { console.log("Reconocio : "+ yytext); return 'IF'}
"else"              { console.log("Reconocio : "+ yytext); return 'RELSE'}
"switch"            { console.log("Reconocio : "+ yytext); return 'SWITCH'}
"list"              { console.log("Reconocio : "+ yytext); return 'LIST'}
"new"               { console.log("Reconocio : "+ yytext); return 'NEW'}
"true"              { console.log("Reconocio : "+ yytext); return 'TRUE'}
"false"             { console.log("Reconocio : "+ yytext); return 'FALSE'}
"print"             { console.log("Reconocio : "+ yytext); return 'PRINT'}
"ejecutar"          { console.log("Reconocio : "+ yytext); return 'EJECUTAR'}
"while"             { console.log("Reconocio : "+ yytext); return 'WHILE'}
"do"                { console.log("Reconocio : "+ yytext); return 'DO'}
"for"               { console.log("Reconocio : "+ yytext); return 'FOR'}
"void"              { console.log("Reconocio : "+ yytext); return 'VOID'}
"exec"              { console.log("Reconocio : "+ yytext); return 'EXEC'}
"default"           { console.log("Reconocio : "+ yytext); return 'DEFAULT'}
"case"              { console.log("Reconocio : "+ yytext); return 'CASE'}
"break"             { console.log("Reconocio : "+ yytext); return 'BREAK'}
"continue"          { console.log("Reconocio : "+ yytext); return 'CONTINUE'}
"return"            { console.log("Reconocio : "+ yytext); return 'RETURN'}

/* SIMBOLOS ER */
{decimal}           { console.log("Reconocio : "+ yytext); return 'DECIMAL'}
{entero}            { console.log("Reconocio : "+ yytext); return 'ENTERO'}
{cadena}            { console.log("Reconocio : "+ yytext); return 'CADENA'}
{id}                { console.log("Reconocio : "+ yytext); return 'ID'}
{caracter}          { console.log("Reconocio : "+ yytext); return 'CARACTER'}
/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     return 'ERROR'

/lex

/* Area de imports */

%{
    const Print = require('src/Clases/Instrucciones/Print');
    const primitivo = require('src/Clases/Expresiones/Primitivo');
    const identificador = require('src/Clases/Expresiones/Identificador');
    const ast = require('src/Clases/Ast/Ast');
    const declara = require('src/Clases/Instrucciones/Declaracion');
    const tipo = require('src/Clases/TablaSimbolos/Tipo');
    const simbolo = require('src/Clases/TablaSimbolos/Simbolos');
    const asigna = require('src/Clases/Instrucciones/Asignacion');
    const aritmetica = require('src/Clases/Expresiones/Aritmetica');
    const logica = require('src/Clases/Expresiones/Logica');
    const relacional = require('src/Clases/Expresiones/Relacional');
    const ternario = require('src/Clases/Expresiones/Ternario');
    const If = require('src/Clases/Instrucciones/SentenciaDeControl/If');
    const While = require('src/Clases/Instrucciones/SentenciaCiclica/While');
    const DoWhile = require('src/Clases/Instrucciones/SentenciaCiclica/DoWhile');
    const metodo = require('src/Clases/Instrucciones/Metodo');
    const llamadita = require('src/Clases/Instrucciones/Llamada');
    const execito = require('src/Clases/Instrucciones/Exec');
    const For = require('src/Clases/Instrucciones/SentenciaCiclica/For');
    const detener = require('src/Clases/Instrucciones/SentenciaTransferencia/Detener');
    const continuar = require('src/Clases/Instrucciones/SentenciaTransferencia/Continuar');
    const retornar = require('src/Clases/Instrucciones/SentenciaTransferencia/Retornar');
    const casito = require('src/Clases/Instrucciones/SentenciaDeControl/Case');
    const swish = require('src/Clases/Instrucciones/SentenciaDeControl/Switch');

%}

/* Precedencia de operadores */
%left 'INTERRC'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'COMPARAR' 'DIFERENTE' 'MENORQ' 'MENORIGUAL' 'MAYORQ' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'DIV' 'MULTI' 'MOD'
%nonassoc 'POTENCIA'
%right 'UNARIO'


%start inicio

%% /* Gramatica */
inicio: instrucciones EOF { $$ = new ast.default($1); return $$; }
    ;

instrucciones : instrucciones instruccion { $$ = $1; $$.push($2); }
            | instruccion { $$ = new Array(); $$.push($1); }
            ;

instruccion : print           { $$ = $1; }
            | declaracion PYC { $$ = $1; }
            | asignacion  PYC { $$ = $1; }
            | Sif             { $$ = $1; }
            | Swhile          { $$ = $1; }
            | SDoWhile        { $$ = $1; }
            | actualizar PYC  { $$ = $1; }
            | metodo          { $$ = $1; }
            | llamaMetodo PYC { $$ = $1; }
            | Sexec PYC       { $$ = $1; }
            | Sfor            { $$ = $1; } 
            | Sswitch         { $$ = $1; }
            | BREAK PYC       { $$ = new detener.default(); }
            | CONTINUE PYC    { $$ = new continuar.default(); }
            | RETURN PYC      { $$ = new retornar.default(null); }
            | RETURN expresion PYC { $$ = new retornar.default($2); }
            ;
Sswitch: SWITCH PARA expresion PARC LLAVEA listaCases defa LLAVEC   { $$ = new swish.default($3,$6,$7); }
        | SWITCH PARA expresion PARC LLAVEA listaCases LLAVEC       { $$ = new swish.default($3,$6,null); }
        | SWITCH PARA expresion PARC LLAVEA def LLAVEC              { $$ = new swish.default($3,null,$7); }
        ;
listaCases: listaCases CASE expresion DOSP instrucciones { $$ = $1; $$.push( new casito.default($3,$5)); }
        | CASE expresion DOSP instrucciones              { $$ = new Array(); $$.push( new casito.default($2,$4)); } 
        ;

defa: DEFAULT DOSP instrucciones { $$ = $3; }
    ;

Sfor: FOR PARA declaracion PYC expresion PYC actualizar PARC LLAVEA instrucciones LLAVEC
     { $$ = new For.default($3,null,$5,$7,$10,@1.first_line,@1.last_column);}
    | FOR PARA asignacion PYC expresion PYC actualizar PARC LLAVEA instrucciones LLAVEC  
     { $$ = new For.default(null,$3,$5,$7,$10,@1.first_line,@1.last_column); }
    | FOR PARA asignacion PYC expresion PYC asignacion PARC LLAVEA instrucciones LLAVEC
     { $$ = new For.default(null,$3,$5,$7,$10,@1.first_line,@1.last_column); }
    ;

Sexec: EXEC llamaMetodo { $$ = new execito.default($2,@1.first_line,@1.last_column); }
    ;

llamaMetodo: ID PARA parametrosLlamda PARC { $$ = new llamadita.default($1,@1.first_line,@1.last_column,$3); }
            | ID PARA PARC                 { $$ = new llamadita.default($1,@1.first_line,@1.last_column,[]); }    
        ;

parametrosLlamda: parametrosLlamda COMA expresion    { $$ = $1; $$.push($3); }
                | expresion                          { $$ = new Array(); $$.push($1); }
                ;        

metodo: VOID ID PARA PARC LLAVEA instrucciones LLAVEC           { $$ = new metodo.default(3, new tipo.default('VOID'), $2, [], true, $6, @1.first_line,@1.last_column); }
    | VOID ID PARA parametros PARC LLAVEA instrucciones LLAVEC  { $$ = new metodo.default(3, new tipo.default('VOID'), $2, $4, true, $7, @1.first_line,@1.last_column); }
    ;

parametros: parametros COMA tipo ID       { $$ = $1; $$.push(new simbolo.default(6,$3,$4,null)); }
                | tipo ID                 { $$ = new Array(); $$.push(new simbolo.default(6,$1,$2,null)); }
                ;

actualizar: ID INCRE   { $$ = new asigna.default($1, new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'+', new primitivo.default(1,@1.first_line,@1.last_column), @1.first_line, @1.last_column, false),@1.first_line,@1.last_column); }
        | ID DECRE     { $$ = new asigna.default($1, new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'-', new primitivo.default(1,@1.first_line,@1.last_column), @1.first_line, @1.last_column, false),@1.first_line,@1.last_column); }
        ;

SDoWhile: DO LLAVEA instrucciones LLAVEC WHILE PARA expresion PARC PYC    { $$ = new DoWhile.default($7,$3,@1.first_line,@1.last_column); } 
        ;

Swhile : WHILE PARA expresion PARC LLAVEA instrucciones LLAVEC { $$ = new While.default($3,$6,@1.first_line,@1.last_column); }
        ;

Sif: IF PARA expresion PARC LLAVEA instrucciones LLAVEC                                       { $$ = new If.default($3, $6, [], @1.first_line, @1.last_column); }
    | IF PARA expresion PARC LLAVEA instrucciones LLAVEC RELSE Sif                            { $$ = new If.default($3, $6, [$9], @1.first_line, @1.last_column); }
    | IF PARA expresion PARC LLAVEA instrucciones LLAVEC RELSE LLAVEA instrucciones LLAVEC    { $$ = new If.default($3, $6, $10, @1.first_line, @1.last_column); }
    ;

asignacion : ID IGUAL expresion { $$ = new asigna.default($1, $3 ,@1.first_line,@1.last_column); }
            ;

print : PRINT PARA expresion PARC PYC { $$ = new Print.default($3, @1.first_line, @1.last_column);}
    ;

// int = 0, string = 4, char = 3, boolean = 2, double = 1
declaracion : tipo ID    { 
                                if($1.type == 0){
                                    $$ = new declara.default($1, new simbolo.default(1,null,$2,new primitivo.default(0, @1.first_line, @1.last_column)), @1.first_line, @1.last_column); 
                                }else if($1.type == 1){
                                    $$ = new declara.default($1, new simbolo.default(1,null,$2,new primitivo.default(0.0, @1.first_line, @1.last_column)), @1.first_line, @1.last_column); 
                                }else if($1.type == 2){
                                    $$ = new declara.default($1, new simbolo.default(1,null,$2,new primitivo.default(true, @1.first_line, @1.last_column)), @1.first_line, @1.last_column); 
                                }else if($1.type == 3){
                                    $$ = new declara.default($1, new simbolo.default(1,null,$2,new primitivo.default('\0', @1.first_line, @1.last_column)), @1.first_line, @1.last_column); 
                                }else if($1.type == 4){
                                    $$ = new declara.default($1, new simbolo.default(1,null,$2,new primitivo.default("", @1.first_line, @1.last_column)), @1.first_line, @1.last_column); 
                                }
                            }
            | tipo ID IGUAL expresion { $$ = new declara.default($1, new simbolo.default(1,null,$2,$4), @1.first_line, @1.last_column); }
            ;

tipo : INT      { $$ = new tipo.default('ENTERO'); }
    | DOUBLE    { $$ = new tipo.default('DECIMAL'); }
    | CHAR      { $$ = new tipo.default('CARACTER'); }
    | STRING    { $$ = new tipo.default('CADENA'); }
    | BOOLEAN   { $$ = new tipo.default('BOOLEANO'); }
    ;


expresion: DECIMAL { $$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column); }
        | ENTERO   { $$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column); }
        | CADENA   { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, @1.first_line, @1.last_column); }
        | CARACTER { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, @1.first_line, @1.last_column); }
        | TRUE     { $$ = new primitivo.default(true, @1.first_line, @1.last_column); }
        | FALSE    { $$ = new primitivo.default(false, @1.first_line, @1.last_column); }
        | ID       { $$ = new identificador.default($1, @1.first_line, @1.last_column); }
        | expresion MAS expresion { $$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column, false); }
        | expresion MENOS expresion { $$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column, false); }
        | expresion MULTI expresion { $$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column, false); }
        | expresion DIV expresion { $$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column, false); }
        | MENOS expresion %prec UNARIO { $$ = new aritmetica.default($2, 'UNARIO', $2, @1.first_line, @1.last_column, true); }
        | expresion AND expresion { $$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column, false); }
        | expresion OR expresion { $$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column, false); }
        | NOT expresion { $$ = new logica.default($2, '!', null, @1.first_line, @1.last_column, true); }
        | PARA expresion PARC { $$= $2; }
        | expresion POTENCIA expresion { $$ = new aritmetica.default($1, '^', $3, @1.first_line, @1.last_column, false); }
        | expresion MOD expresion { $$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column, false); }
        | expresion MENORQ expresion { $$ = new relacional.default($1,'<',$3,@1.first_line, @1.last_column, false); }
        | expresion MENORIGUAL expresion { $$ = new relacional.default($1,'<=',$3,@1.first_line, @1.last_column, false); }
        | expresion MAYORQ expresion { $$ = new relacional.default($1,'>',$3,@1.first_line, @1.last_column, false); }
        | expresion MAYORIGUAL expresion { $$ = new relacional.default($1,'>=',$3,@1.first_line, @1.last_column, false); }
        | expresion DIFERENTE expresion { $$ = new relacional.default($1,'!=',$3,@1.first_line, @1.last_column, false); }
        | expresion COMPARAR expresion { $$ = new relacional.default($1,'==',$3,@1.first_line, @1.last_column, false); }
        | expresion INTERRC expresion DOSP expresion { $$ = new ternario.default($1,$3,$5,@1.first_line,@1.last_column); }
        | ID INCRE { $$ = new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'+', new primitivo.default(1,@1.first_line,@1.last_column), @1.first_line, @1.last_column, false); }
        | ID DECRE { $$ = new aritmetica.default(new identificador.default($1,@1.first_line,@1.last_column),'-', new primitivo.default(1,@1.first_line,@1.last_column), @1.first_line, @1.last_column, false); }
        ;
