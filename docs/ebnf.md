# [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form)

**interface** =
  "interface" , **identifier** ,
  ( [ **predicate literal** ] , "{" , **parameter list** , "}" )
  | ( **predicate literal** , [ "{" , **parameter list** , "}" ] ) ;
  (\* interface has at least one of predicate literal or parameter list \*)

**minimal interface** = "interface" , **identifier** ,
  ( ":" , **type** ) | **predicate literal**;

**function interface** =
  "interface" , **identifier** , "{" , **function signatures** , "}" ;

**function signatures** =
  **function signature** , { "," , **function signature** } ;

**function signature** =
  [ **identifier** ] , "(" , [ **parameter list** ] ,  ")" ,
  "=>", [ **identifier** , [ "?" ] ":" ] , **type** ,
  [ "requires" , ":" , **value expressions** ] ,
  [ "throws" , [ ":" , **identifier** ] ] ;

**parameter list** = **parameter** , { "," , **parameter** } ;

**parameter** = ( [ **identifier** , ":" ] , **type** ) | **spread parameter** ;

**spread parameter** = "..." , **identifier** , ":" , **array type** ;

**type** = **array type**
         | **non-array type**
         | **union type** ;

**union type** = **type** , { "|" , **type** } ;

**array type** = **non-array type** , "[" , "]" ;

**non-array type** = **identifier**
                   | **builtin type**
                   | **literal type** ;

**identifier** =
  ( **identifier character** , { **identifier character** } ) - **reserved word** ;

**value expressions** = **value expression** , { "," , **value expression** } ;

**literal type** = ? set of JavaScript-legal literal values ? | **regexp literal**;

**predicate literal** = ? JavaScript-legal arrow function ? , ";" ;

**regexp literal** = "/" , ? JavaScript-legal Regular Expression characters ? , "/" ;

**identifier character** = ? set of JavaScript-legal identifier characters ? ;

**reserved word** = ? set of JavaScript and rtype reserved words ? ;

**builtin type** = "Any"
                 | "Array"
                 | "Boolean"
                 | "Function"
                 | "Number"
                 | "Object"
                 | "String"
                 | "Void"
                 | "Predicate" ;

**value expression** = ? JavaScript-legal variable, dot-property or array-access ? ;
  (\* e.g. document, navigator.geolocation, String.prototype.trim \*)
