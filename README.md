# xyntax
Xyntax is a lightweight, developer-friendly JavaScript package and CLI tool that takes syntax highlighting to the next level. Xyntax dynamically parses your code during development, generating pre-highlighted strings. This means zero performance issues for your documentation sites. 



# Key Features

- **Dynamic Parsing:** Code is parsed during development for real-time, browser-ready highlighting.    

- **Zero performance overhead:** Minimal impact on performance, ensuring a smooth development experience.    

- **Theme Flexibility:** Choose from a range of themes or customize your own for a personalized code highlighting.    

- **CLI support:** Xyntax also has full support to be used via the CLI.    


# Usage Examples
Xyntax looks for files that ends with a *.xmd.&lt;extension&gt;* e.g. `.xmd.js` in the directory that is passed as source argument when working with the CLI or using in your JS/TS projects.     

To parse a file via CLI,
```txt
xyntax path/to/source/file path/to/relative/directory
```    

To parse a directory via CLI,
```txt
xyntax path/to/source/file path/to/relative/directory
```    
