# xyntax
Xyntax is a lightweight, developer-friendly JavaScript package and CLI tool that takes syntax highlighting to the next level. Xyntax dynamically parses your code during development, generating pre-highlighted strings. This means zero performance issues for your documentation sites. 



# Key Features

- **Dynamic Parsing:** Code is parsed during development for real-time, browser-ready highlighting.    

- **Zero performance overhead:** Minimal impact on performance, ensuring a smooth development experience.    

- **Theme Flexibility:** Choose from a range of themes or customize your own for a personalized code highlighting.    

- **CLI support:** Xyntax also has full support to be used via the CLI.    

# Installation
```
npm install -g xyntax
```
# Code Examples
This is a symple jSX code that we would like to highliht in a documentation site using xyntax.
```js
const hello = 'Hello World'

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

```    

To highlight the above code in our documentation site, we need to have the code below in `somfile.xmd.js` and parse via CLI using `xyntax somfile.xmd.js path/to/project_root` and insert the result into our project using `// \insert my_identifier`    

**somfile.xmd.js**
```js
//<xyntax path="./some_file_in_project_root" my_identifier>
const hello = 'Hello World'

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
//</xyntax>
```   

In our actual project where we need the highlighted string, we could insert the result in this way.    
```js
// some codes
export const codeExample = `` // \insert  my_identifier    
// some more codes
```

# Usage Examples
Xyntax looks for files that ends with a ***.xmd.&lt;extension&gt;*** e.g. `.xmd.js` in the directory that is passed as source argument when working with the CLI or using in your JS/TS projects.     

To parse a file via CLI,
```
xyntax path/to/source/file path/to/relative/directory
```    

To parse a directory via CLI,
```
xyntax path/to/source/file path/to/relative/directory
```    
