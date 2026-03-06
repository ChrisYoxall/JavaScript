# Typescript


## Installation

ESLint was installed by running:  `pnpm add -D eslint@10 typescript-eslint @eslint/js`

Get in-depth checks by adding "Linting with Type Information", refer https://typescript-eslint.io/getting-started/typed-linting/

To get the ESLint settings in Webstorm:
- Open Settings | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint.
- Tick the 'Automatic ESLint configuration' option


## Run Examples

Running 'tsc' will compile the TypeScript files into JavaScript files.

The tsconfig.json file is used to configure the TypeScript compiler. It specifies the root files and the compiler
options required to compile the project. The 'outDir' option specifies the directory where the compiled JavaScript
files are placed, which is the 'dist' directory in this case.

Once compiled the JavaScript files can be run using the 'node' command, for example 'node hello.js'.

NOTE: Webstorm allows you to run the TypeScript files directly. Can use the 'Run' button but also can right-click on
the file or open tab and select 'Run <file>'.