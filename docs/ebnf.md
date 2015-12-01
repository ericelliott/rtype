# [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form)


## Entry Points

**minimal interface** = "interface" , **identifier** ,
  ( ":" , **type** ) | **predicate literal** ;

**interface** =
  "interface" , **identifier** ,
  ( [ **predicate literal** ] , "{" , **object properties** , "}" )
  | ( **predicate literal** , [ "{" , **object properties** , "}" ] ) ;
  (\* interface has one or both but never neither \*)

**function interface** =
  "interface" , **identifier** , "{" , **function signatures** , "}" ;

**function signature** =
  [ **identifier** ] , "(" , [ **parameters** ] ,  ")" ,
  { [ "," ] , **function trailer** } ;
  (\* parser should confirm semantics, allow 1 of each function trailer \*)


## Non-Terminal Production Rules


### Repeaters (length >= 1)

**object properties** =
  **object property** , { "," , **object property** } ;

**function signatures** =
  **function signature** , { "," , **function signature** } ;

**parameters** = **parameter** , { "," , **parameter** } ;

**identifier** =
  ( **identifier character** , { **identifier character** } ) - **reserved word** ;

**value expressions** = **value expression** , { "," , **value expression** } ;


### Objects

**destructured object** = "{" , **object properties** , "}" ;

**object property** = **parameter**
                       | **object spread property** ;

**object spread property** = "..." , **identifier** , "?" ;


### Parameters

**parameter** = **type**
              | **named parameter**
              | **spread parameter**
              | **destructured object** ;

**named parameter** =
  **identifier** ,
  ( [ **default value** ] ":" , **type** )
  | ( **default value** ":" , [ **type** ] );
  (\* named parameter has one or both but never neither \*)

**default value** = "=" , **literal type** ;

**spread parameter** = "..." , **identifier** , ":" , **array type** ;

**function trailer** = ( "=>", [ **identifier** , [ "?" ] ":" ] , **type** )
                     | ( "requires" , ":" , **value expressions** )
                     | ( "throws" , [ ":" , **identifier** ] ) ;


### Types

**type** = **array type**
         | **non-array type**
         | **union type** ;

**union type** = **type** , { "|" , **type** } ;

**array type** = **non-array type** , "[" , "]" ;

**non-array type** = **identifier**
                   | **builtin type**
                   | **literal type** ;


## Terminal Production Rules and JavaScript

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
