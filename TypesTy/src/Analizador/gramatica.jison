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
"-"                  { console.log("Reconocio : "+ yytext); return 'MENOS'}
"++"                 { console.log("Reconocio : "+ yytext); return 'INCRE'}
"--"                 { console.log("Reconocio : "+ yytext); return 'DECRE'}
"+"                  { console.log("Reconocio : "+ yytext); return 'MAS'}
"("                  { console.log("Reconocio : "+ yytext); return 'PARA'}
")"                  { console.log("Reconocio : "+ yytext); return 'PARC'}
"["                  { console.log("Reconocio : "+ yytext); return 'CORA'}
"]"                  { console.log("Reconocio : "+ yytext); return 'CORC'}
";"                  { console.log("Reconocio : "+ yytext); return 'PYC'}
","                  { console.log("Reconocio : "+ yytext); return 'COMA'}
"="                  { console.log("Reconocio : "+ yytext); return 'IGUAL'}
"=="                 { console.log("Reconocio : "+ yytext); return 'ASIGNAR'}
"!="                 { console.log("Reconocio : "+ yytext); return 'DIFERENTE'}
"<"                  { console.log("Reconocio : "+ yytext); return 'MENORQ'}
"<="                 { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">"                  { console.log("Reconocio : "+ yytext); return 'MAYORQ'}
">="                 { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"||"                 { console.log("Reconocio : "+ yytext); return 'OR'}
"&&"                 { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                  { console.log("Reconocio : "+ yytext); return 'NOT'}
":"                  { console.log("Reconocio : "+ yytext); return 'DOSP'}
"?"                  { console.log("Reconocio : "+ yytext); return 'INTERRC'}
"^"                  { console.log("Reconocio : "+ yytext); return 'POTENCIA'}
"%"                  { console.log("Reconocio : "+ yytext); return 'MOD'}

/* Palabras reservadas */
"int"               { console.log("Reconocio : "+ yytext); return 'INT'}
"double"            { console.log("Reconocio : "+ yytext); return 'DOUBLE'}
"boolean"           { console.log("Reconocio : "+ yytext); return 'BOOLEAN'}
"char"              { console.log("Reconocio : "+ yytext); return 'CHAR'}
"string"            { console.log("Reconocio : "+ yytext); return 'STRING'}
"if"                { console.log("Reconocio : "+ yytext); return 'IF'}
"else"              { console.log("Reconocio : "+ yytext); return 'ELSE'}
"switch"            { console.log("Reconocio : "+ yytext); return 'SWITCH'}
"list"              { console.log("Reconocio : "+ yytext); return 'LIST'}
"new"               { console.log("Reconocio : "+ yytext); return 'NEW'}
"true"              { console.log("Reconocio : "+ yytext); return 'TRUE'}
"false"             { console.log("Reconocio : "+ yytext); return 'FALSE'}
"print"             { console.log("Reconocio : "+ yytext); return 'PRINT'}
"ejecutar"          { console.log("Reconocio : "+ yytext); return 'EJECUTAR'}

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
%}

/* Precedencia de operadores */
%left 'INTERRC'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQ' 'MAYORQ' 'ASIGNAR' 'MENORIGUAL' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%right 'UNARIO'

%start inicio

%% /* Gramatica */
inicio: instrucciones EOF { $$ = new ast.default($1); return $$; }
    ;

instrucciones : instrucciones instruccion {$$ = $1; $$.push($2); }
            | instruccion { $$ = new Array(); $$.push($1); }
            ;

instruccion : print         { $$ = $1; }
            | declaracion   { $$ = $1; }
            | asignacion    { $$ = $1; }
            ;
asignacion : ID IGUAL expresion PYC { $$ = new asigna.default($1, $3 ,@1.first_line,@1.last_column); }
            ;

print : PRINT PARA expresion PARC PYC { $$ = new Print.default($3, @1.first_line, @1.last_column);}
    ;

declaracion : tipo ID PYC                 { $$ = new declara.default($1, new simbolo.default(1,null,$2,null), @1.first_line, @1.last_column); }
            | tipo ID IGUAL expresion PYC { $$ = new declara.default($1, new simbolo.default(1,null,$2,$4), @1.first_line, @1.last_column); }
            ;

tipo : INT      { $$ = new tipo.default('ENTERO'); }
    | DOUBLE    { $$ = new tipo.default('DECIMAL'); }
    | CHAR      { $$ = new tipo.default('CARACTER'); }
    | STRING    { $$ = new tipo.default('CADENA'); }
    | BOOLEAN   { $$ = new tipo.default('BOOLEANO'); }
    ;

expresion: DECIMAL { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
        | ENTERO   { $$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column); }
        | CADENA   { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column); }
        | CARACTER { $1 = $1.slice(1, $1.length-1); console.log($1); $$ = new primitivo.default($1, $1.first_line, $1.last_column); }
        | TRUE     { $$ = new primitivo.default(true, $1.first_line, $1.last_column); }
        | FALSE    { $$ = new primitivo.default(false, $1.first_line, $1.last_column); }
        | ID       { $$ = new identificador.default($1, @1.first_line, @1.last_column); }
        | expresion MAS expresion { $$ = new aritmetica.default($1, '+', $3, $1.first_line, $1.last_column, false); }
        | expresion MENOS expresion { $$ = new aritmetica.default($1, '-', $3, $1.first_line, $1.last_column, false); }
        | expresion MULTI expresion { $$ = new aritmetica.default($1, '*', $3, $1.first_line, $1.last_column, false); }
        | expresion DIV expresion { $$ = new aritmetica.default($1, '/', $3, $1.first_line, $1.last_column, false); }
        | MENOS expresion %prec UNARIO { $$ = new aritmetica.default($1, 'UNARIO', null, $1.first_line, $1.last_column, false); }
        ;
