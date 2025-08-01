# JavaScript Style Guide

This page outlines the style guide / coding conventions for JavaScript code within the Defra AICE team.

This guide is an extension to the [Defra JavaScript Standards](https://defra.github.io/software-development-standards/standards/javascript_standards/) and is intended to be used in conjunction with it.

## Table of Contents
1. [Source Files](#1-source-files)
    - [File Naming](#11-file-naming)
    - [Formatting](#12-formatting)
    - [Indentation](#121-indentation)
    - [Semicolons](#122-semicolons)
    - [Line Length Limit](#123-line-length-limit)
2. [ES Modules](#2-es-modules)
    - [Imports](#21-imports)
    - [Exports](#212-exports)
3. [Variable Declarations](#3-variable-declarations)
4. [Functions](#4-functions)
    - [Function Declarations](#41-function-declarations)
    - [Function Expressions (aka anonymous or arrow functions)](#42-function-expressions-aka-anonymous-or-arrow-functions)
    - [Parameters](#421-parameters)
    - [Object Method Definition](#43-object-method-definition)
5. [Strings](#5-strings)
    - [String Literals](#51-string-literals)
    - [Template Literals](#52-template-literals)
6. [Classes](#6-classes)
7. [Testing](#7-testing)
    - [Mocking](#71-mocking)
8. [JSDocs](#8-jsdocs)
9. [Contributions](#9-contributions)

## 1 Source Files

### 1.1 File Naming

All source files should be UTF-8 encoded and have a `.js` extension. The file name must also be in kebab-case, which is a lower-case name with words separated by hyphens. For example, `my-awesome-file.js`.

The file name should be descriptive of the module's purpose and functionality. Avoid using abbreviations or acronyms unless they are widely recognised.

For example, a good file name for a server module might be `server.js`, while a bad file name might be `s.js` or `initialise.js`.

### 1.2 Formatting
The Defra JavaScript Standards enforces using ESLint using only [neostandard](https://github.com/neostandard/neostandard) as the only linter of choice. Therefore, all AICE JavaScript code should follow the neostandard rules.

All ESLint rules enabled in neostandard by default can be found [here](https://eslint.style/rules), however, key rules are highlighted below.

#### 1.2.1 Indentation
All code blocks should be indented with 2 spaces. Tabs are not allowed.

#### 1.2.2 Semicolons
No semicolons should be used at the end of statements.

Do this:
```javascript
function myFunction() {
  console.log('Hello, world!')
}
```

Don't do this:
```javascript
function myFunction() {
  console.log('Hello, world!');
}
```

#### 1.2.3 Line Length Limit
The maximum line length is 80 characters. Lines should be wrapped or refactored to fit within this limit.

## 2 ES Modules

The AICE team uses ES modules for JavaScript code. Each module should be defined in its own file, and the file name should match the module name.

### 2.1 Imports
All module imports should use ES `import` syntax and not CommonJS `require` syntax. The import statements should be placed at the top of the file, before any other code.

All imports should be at the top of the file, and they should be grouped in the following order alphabetically:
1. External libraries
2. Internal modules

Do this:
```javascript
import Hapi from '@hapi/hapi'

import myModule from './my-module.js'
```

Don't do this:
```javascript
const Hapi = require('@hapi/hapi')

const myModule = require('./my-module.js')
```

### 2.1.2 Exports
All module export should use ES `export` syntax and not CommonJS `module.exports`. The export statements should be placed at the bottom of the file, after all other code.

Always use named exports, default exports are not allowed.

Do this:
```javascript
function myFunction() {
  // function code
}

export { 
  myFunction 
}
```

Don't do this:
```javascript
export default function myFunction() {
  // function code
}

// or this
module.exports = function myFunction() {
  // function code
}
```

## 3 Variable Declarations
All variables should be declared using `const` by default. If a variable needs to be reassigned, use `let`. Using var is not allowed.

Do this:
```javascript
const myVariable = 'Hello, world!'

// or this
let myVariable

myVariable = 'Hello, world!'
```

Don't do this:
```javascript
var myVariable = 'Hello, world!'
```

## 4 Functions

### 4.1 Function Declarations

In general, function declarations should be used instead of function expressions (aka anonymous or arrow functions).

Essentially, if the function needs to be called by name, use a function declaration.

If the function is only used as a callback, use an arrow function.

Do this:
```javascript
function myFunction() {
  // function code
}
```

Don't do this:
```javascript
const myFunction = function() {
  // function code
}

// or this
const myFunction = () => {
  // function code
}
```

### 4.2 Function Expressions (aka anonymous or arrow functions)
An exception to the rule of using function declarations is when the function is only being used as a callback or to handle an event, in which case a function expression is acceptable.

Essentially, if a function needs to be called by name, use a function declaration. If the function is only used as a callback, use a function expression.

Acceptable use of an arrow function:
```javascript
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})

// or
test('my test', () => {
  // test code
})
```

### 4.2.1 Parameters
When using arrow functions, parentheses are required around the parameters, even if there is only one parameter.

Do this:
```javascript
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})
```

Don't do this:
```javascript
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error)
})
```

### 4.3 Object Method Definition

When defining methods inside objects, use the method definition syntax.

Do this:
```javascript
const entity = {
  test: 'hello world',
  register () {
    // method code
  }
}
```

Don't do this:
```javascript
const entity = {
  test: 'hello world',
  register: function () {
    // method code
  },
  another: () => {
    // method code
  }
}
```

## 5 Strings

### 5.1 String Literals
All strings should use single quotes (`'`) for string literals. Double quotes (`"`) are not allowed.

### 5.2 Template Literals
Template literals should be used for multi-line strings or when string interpolation is required. For simple strings, use single quotes.

## 6 Classes
In general, classes are not used in AICE JavaScript code as they are not necessary for most use cases and result in more boilerplate for no added benefit. Instead, export standalone functions from modules or use factory functions to create objects.

If a class is necessary, e.g. you need to encapsulate state or share a dependency instance across methods, then you should use ES6 style classes. The class name should be in PascalCase, and the file name should match the class name in kebab-case.

Do this:
```javascript
class MyClass {
  constructor() {
    this.myProperty = 'Hello, world!'
  }

  myMethod() {
    console.log(this.myProperty)
  }
}
```

Don't do this:
```javascript
class myClass {
  constructor() {
    this.myProperty = 'Hello, world!'
  }

  myMethod() {
    console.log(this.myProperty)
  }
}

// or this
class MyClass {
    static myStaticMethod() {
      console.log('This is a static method')
    }
}
```

## 7 Testing
We use [Vitest](https://vitest.dev/) for testing JavaScript code. All tests should be placed in a dedicated `tests` directory at the root of the project. Each test file should be named after the module it tests, with a `.test.js` suffix.

Test files should not be placed in the same directory as the module under test.

### 7.1 Mocking
When mocking dependencies in tests, if not using dependency injection, you should use the `vi.mock()` function provided by Vitest. You should not use any other mocking library such as `sinon` or `jest.mock()`.

You should also only mock dependencies that the team owns or has control over. If a dependency is an external library, you should not mock it unless absolutely necessary. In these cases, you should consider using a integration test instead of a unit test.

## 8 JSDocs
All functions, classes, and modules should be documented using JSDoc comments. However, you should take a pragmatic approach to using JSDocs. Only document what is necessary to understand the code, and avoid over-documenting.

For example, when creating a function or a class, you should document:
- The purpose of the function or class
- The parameters it takes, including their types and descriptions
- The return value, including its type and description
- Any exceptions that may be thrown

You must avoid writing overly verbose comments that do not add value or are self-explanatory from the code itself. The goal is to make the code more understandable, not to repeat what is already clear.

Likewise, you should also avoid using JSDocs to document owners or versioning information, as this information is not relevant to the code itself and can be easily tracked using version control systems like Git.

Do this:
```javascript
/**
 * Adds two numbers together.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
  return a + b
}
```

Don't do this:
```javascript
/**
 * This function adds two numbers together.
 * It takes two parameters, a and b, which are both numbers.
 * It returns the sum of the two numbers.
 * 
 * @author John Doe
 * @version 1.0
 * @since 2023-10-01
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
  return a + b
}
```

## Contributions
If you would like to contribute to this style guide, please open a pull request on the [Defra AICE Team GitHub](https://github.com/DEFRA/aice-team) repository.

For anything that is not covered by this style guide, we recommend following the [Defra JavaScript Standards](https://defra.github.io/software-development-standards/standards/javascript_standards/) and staying consistent with the existing codebase. If alignment across AICE is required, please raise an issue in [Defra AICE Team GitHub](https://github.com/DEFRA/aice-team/issues).
