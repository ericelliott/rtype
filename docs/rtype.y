%start spec

/* grammar for parsing rtype */

%%

spec
    :
    | ReservedWord EOF
    ;

/*
ECMAScript specification: section 11.6
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-names-and-keywords
*/

/*
ECMAScript specification: section 11.6.2
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-reserved-words
*/

ReservedWord
    : Keyword
    | FutureReservedWord
    | NullLiteral
    | BooleanLiteral
    ;

Keyword
    : 'break'	 | 'do'       | 'in'         | 'typeof'
    | 'case'     | 'else'     | 'instanceof' | 'var'
    | 'catch'    | 'export'   | 'new'        | 'void'
    | 'class'    | 'extends'  | 'return'     | 'while'
    | 'const'    | 'finally'  | 'super'      | 'with'
    | 'continue' | 'for'      | 'switch'     | 'yield'
    | 'debugger' | 'function' | 'this'
    | 'default'  | 'if'       | 'throw'
    | 'delete'   | 'import'   | 'try'
    ;

FutureReservedWord
    : 'enum' | 'await'
    /* strict mode reserved words below */
    | 'implements' | 'package' | 'protected'
    | 'interface'  | 'private' | 'public'
    ;

/*
ECMAScript specification: section 11.8.1
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-null-literals
*/

NullLiteral
    : 'null'
    ;

/*
ECMAScript specification: section 11.8.2
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-boolean-literals
*/

BooleanLiteral
    : 'true' | 'false'
    ;

%%
