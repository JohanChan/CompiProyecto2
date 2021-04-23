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
"!="                 { console.log("Reconocio : "+ yytext); return 'DIFERENCIA'}
"<"                  { console.log("Reconocio : "+ yytext); return 'MENORQ'}
"<="                 { console.log("Reconocio : "+ yytext); return 'MENORIGUAL'}
">"                  { console.log("Reconocio : "+ yytext); return 'MAYORQ'}
">="                 { console.log("Reconocio : "+ yytext); return 'MAYORIGUAL'}
"||"                 { console.log("Reconocio : "+ yytext); return 'OR'}
"&&"                 { console.log("Reconocio : "+ yytext); return 'AND'}
"!"                  { console.log("Reconocio : "+ yytext); return 'NOT'}
":"                  { console.log("Reconocio : "+ yytext); return 'DOSP'}
"?"                  { console.log("Reconocio : "+ yytext); return 'INTERRC'}

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
/*
%{
    const evaluar = require('../Clases/Evaluar'); 
%}
*/
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
inicio
    : instrucciones EOF { /*console.log($1);*/ }
    ;

instrucciones : instrucciones instruccion {$$ = $1; /* console.log($1); */ }
            | instruccion { $$ = $1; /* console.log($1); */ }
            ;

instruccion : declaracion { $$ = $1; }
            | asignacion  { $$ = $1; }
            | print       { $$ = $1; }
            ;

declaracion : tipo listaSimbolos PYC ;

tipo : INT      { console.log("ENTERO"); }
    | DOUBLE    { console.log("DOUBLE"); }
    | STRING    { console.log("STRING"); }
    | CHAR      { console.log("CHAR"); }
    | BOOLEAN   { console.log("BOOLEAN"); }
    ;

listaSimbolos : listaSimbolos COMA ID
            | listaSimbolos COMA ID IGUAL e
            | ID
            | ID IGUAL e
            ;

asignacion : ID IGUAL e PYC 
            ;

print : PRINT PARA e PARC PYC
    ;

e : e MAS e 
    | e MENOS e
    | e MULTI e
    | e DIV e
    | e AND e 
    | NOT e
    | e MAYORQ e
    | e MAYORIGUAL e 
    | e MENORQ e
    | e MENORIGUAL e
    | MENOS e %prec UNARIO 
    | PARA e PARC
    | DECIMAL
    | ENTERO
    | CADENA
    | CHAR
    | TRUE
    | FALSE
    | ID
    | e INTERRC e DOSP e
    | ID INCRE
    | ID DECRE
    ;