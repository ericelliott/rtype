NAME                            [a-zA-Z_][a-zA-Z0-9_-]+\b
NUMBER                          [0-9]+("."[0-9]+)?\b

%%

/*
copying some relevant looking bits from
https://github.com/zaach/jison/blob/master/examples/calculator.jison
*/

\s+                             /* skip whitespace */
{NAME}                          return yytext
{NUMBER}                        return yytext
<<EOF>>                         return 'EOF'

/*
ECMAScript specification: section 11.4
http://www.ecma-international.org/ecma-262/6.0/index.html#sec-comments
*/

"/*"(.|\n|\r)*?"*/"             /* ignore */
"//".*                          /* ignore */

%%
