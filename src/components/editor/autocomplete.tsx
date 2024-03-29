import { completeFromList } from "@codemirror/autocomplete"

export const pythonCompletions = completeFromList([
  { label: "def", type: "keyword", detail: "Function definition" },
  { label: "import", type: "keyword", detail: "Import module" },
  { label: "print", type: "function", detail: "Print objects to the text stream" },
  { label: "class", type: "keyword", detail: "Class definition" },
  { label: "if", type: "keyword", detail: "Conditional statement" },
  { label: "else", type: "keyword", detail: "Alternative conditional statement" },
  { label: "elif", type: "keyword", detail: "Else if part of conditional statement" },
  { label: "for", type: "keyword", detail: "For loop" },
  { label: "while", type: "keyword", detail: "While loop" },
  { label: "break", type: "keyword", detail: "Break out of the loop" },
  { label: "continue", type: "keyword", detail: "Continue to the next iteration of the loop" },
  { label: "return", type: "keyword", detail: "Return from a function" },
  { label: "True", type: "literal", detail: "Boolean True" },
  { label: "False", type: "literal", detail: "Boolean False" },
  { label: "None", type: "literal", detail: "Represents the absence of a value" },
  { label: "in", type: "keyword", detail: "Determine if a value is present in a list, tuple, etc." },
  { label: "not", type: "keyword", detail: "Logical NOT" },
  { label: "and", type: "keyword", detail: "Logical AND" },
  { label: "or", type: "keyword", detail: "Logical OR" },
  { label: "lambda", type: "keyword", detail: "Anonymous function" },
  { label: "try", type: "keyword", detail: "Try block" },
  { label: "except", type: "keyword", detail: "Handle exceptions" },
  { label: "finally", type: "keyword", detail: "Finally block" },
  { label: "with", type: "keyword", detail: "With statement" },
  { label: "as", type: "keyword", detail: "Used to create an alias" },
  { label: "yield", type: "keyword", detail: "Pause the function and return to the caller" },
  { label: "assert", type: "keyword", detail: "Assert statement for debugging" },
  { label: "global", type: "keyword", detail: "Declare a global variable" },
  { label: "nonlocal", type: "keyword", detail: "Declare a non-local variable" },
  { label: "pass", type: "keyword", detail: "Null operation" },
  { label: "raise", type: "keyword", detail: "Raise an exception" }
  // 추가적인 파이썬 자동완성 항목...
])

export const javaCompletions = completeFromList([
  { label: "public", type: "keyword", detail: "Access modifier for public access" },
  { label: "private", type: "keyword", detail: "Access modifier for private access" },
  { label: "protected", type: "keyword", detail: "Access modifier for protected access" },
  { label: "class", type: "keyword", detail: "Declare a class" },
  { label: "interface", type: "keyword", detail: "Declare an interface" },
  { label: "enum", type: "keyword", detail: "Declare an enumeration" },
  { label: "abstract", type: "keyword", detail: "Declare abstract class or method" },
  { label: "final", type: "keyword", detail: "Prevent method overriding or inheritance" },
  { label: "static", type: "keyword", detail: "For creating class methods and variables" },
  { label: "void", type: "type", detail: "Specifies that a method does not have a return value" },
  { label: "int", type: "type", detail: "Integer data type" },
  { label: "double", type: "type", detail: "Double precision floating point data type" },
  { label: "boolean", type: "type", detail: "Boolean data type (true or false)" },
  { label: "char", type: "type", detail: "Character data type" },
  { label: "if", type: "keyword", detail: "Conditional statement" },
  { label: "else", type: "keyword", detail: "Alternative conditional statement" },
  { label: "switch", type: "keyword", detail: "Selection statement" },
  { label: "case", type: "keyword", detail: "A case in a switch statement" },
  { label: "default", type: "keyword", detail: "Default case in a switch statement" },
  { label: "try", type: "keyword", detail: "Starts a block of exception handling code" },
  { label: "catch", type: "keyword", detail: "Catches exceptions generated by try statements" },
  { label: "finally", type: "keyword", detail: "Executes code after try and catch regardless of the result" },
  { label: "throw", type: "keyword", detail: "Throws an exception" },
  { label: "throws", type: "keyword", detail: "Indicates what exceptions may be thrown by a method" },
  { label: "import", type: "keyword", detail: "Imports other Java packages or classes" },
  { label: "package", type: "keyword", detail: "Specifies a package for the Java class" },
  { label: "new", type: "keyword", detail: "Create new objects" },
  { label: "return", type: "keyword", detail: "Return a value from a method" },
  { label: "this", type: "keyword", detail: "Reference to the current object" },
  { label: "super", type: "keyword", detail: "Reference to the superclass object" }
  // 추가적인 자바 자동완성 항목...
])

export const cppCompletions = completeFromList([
  { label: "#include", type: "keyword", detail: "Include a library or a header file" },
  { label: "int", type: "keyword", detail: "Integer data type" },
  { label: "main", type: "function", detail: "Main function of the program" },
  { label: "cout", type: "variable", detail: "Standard output stream" },
  { label: "cin", type: "variable", detail: "Standard input stream" },
  { label: "return", type: "keyword", detail: "Return from a function" },
  { label: "void", type: "keyword", detail: "Specifies that a function does not return a value" },
  { label: "float", type: "keyword", detail: "Floating point data type" },
  { label: "double", type: "keyword", detail: "Double precision floating point data type" },
  { label: "char", type: "keyword", detail: "Character data type" },
  { label: "bool", type: "keyword", detail: "Boolean data type" },
  { label: "string", type: "keyword", detail: "String data type (from <string> header)" },
  { label: "if", type: "keyword", detail: "Conditional statement" },
  { label: "else", type: "keyword", detail: "Alternative conditional statement" },
  { label: "for", type: "keyword", detail: "For loop" },
  { label: "while", type: "keyword", detail: "While loop" },
  { label: "do", type: "keyword", detail: "Do-while loop" },
  { label: "switch", type: "keyword", detail: "Switch statement" },
  { label: "case", type: "keyword", detail: "A case in a switch statement" },
  { label: "default", type: "keyword", detail: "Default case in a switch statement" },
  { label: "break", type: "keyword", detail: "Break out of a loop or a switch" },
  { label: "continue", type: "keyword", detail: "Continue to the next iteration of a loop" },
  { label: "struct", type: "keyword", detail: "Structure definition" },
  { label: "class", type: "keyword", detail: "Class definition" },
  { label: "public", type: "keyword", detail: "Public access modifier" },
  { label: "private", type: "keyword", detail: "Private access modifier" },
  { label: "protected", type: "keyword", detail: "Protected access modifier" },
  { label: "new", type: "keyword", detail: "Dynamic memory allocation" },
  { label: "delete", type: "keyword", detail: "Free dynamically allocated memory" },
  { label: "try", type: "keyword", detail: "Start a block of exception handling code" },
  { label: "catch", type: "keyword", detail: "Catch exceptions" },
  { label: "throw", type: "keyword", detail: "Throw an exception" }
  // 추가적인 C++ 자동완성 항목...
])
export const javascriptCompletions = completeFromList([
  { label: "function", type: "keyword", detail: "Define a function" },
  { label: "var", type: "keyword", detail: "Declare a variable (function-scoped)" },
  { label: "let", type: "keyword", detail: "Declare a block-scoped local variable" },
  { label: "const", type: "keyword", detail: "Declare a block-scoped, read-only named constant" },
  { label: "if", type: "keyword", detail: "Conditional statement" },
  { label: "else", type: "keyword", detail: "Alternative conditional statement" },
  { label: "for", type: "keyword", detail: "For loop" },
  { label: "while", type: "keyword", detail: "While loop" },
  { label: "do", type: "keyword", detail: "Do-while loop" },
  { label: "switch", type: "keyword", detail: "Switch statement" },
  { label: "case", type: "keyword", detail: "Case in a switch statement" },
  { label: "default", type: "keyword", detail: "Default case in a switch statement" },
  { label: "try", type: "keyword", detail: "Try block for error handling" },
  { label: "catch", type: "keyword", detail: "Catch block for handling exceptions" },
  { label: "finally", type: "keyword", detail: "Finally block for specifying code to run regardless of an error" },
  { label: "throw", type: "keyword", detail: "Throw an exception" },
  { label: "return", type: "keyword", detail: "Return statement" },
  { label: "break", type: "keyword", detail: "Break out of the current loop or switch" },
  { label: "continue", type: "keyword", detail: "Skip the rest of the loop iteration" },
  { label: "typeof", type: "keyword", detail: "Determine the type of a variable" },
  { label: "new", type: "keyword", detail: "Create an instance of an object" },
  { label: "this", type: "keyword", detail: "Reference the current object" },
  { label: "class", type: "keyword", detail: "Declare a class" },
  { label: "extends", type: "keyword", detail: "Inherit from a parent class" },
  { label: "super", type: "keyword", detail: "Call the parent class constructor" },
  { label: "import", type: "keyword", detail: "Import modules" },
  { label: "export", type: "keyword", detail: "Export modules" },
  { label: "console.log", type: "function", detail: "Output information to the console" },
  { label: "alert", type: "function", detail: "Display an alert dialog" },
  { label: "document.getElementById", type: "function", detail: "Select an element by its ID" },
  { label: "addEventListener", type: "function", detail: "Attach an event handler to an element" }
  // Additional JavaScript completions...
])
