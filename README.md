# ar-model-converter

AR Model converter. Convert obj model to usdz and glTF.

- usdz conversion uses `usdz_converter`
- glTF conversion uses `obj2gltf`

Command line tool uses `inquirer.js`

## Prerequisites

- macOS with XCode 10 installed (to get usdz_converter)

- ```bash
  $ npm install -g obj2gltf
  ```

## Setup

```bash
$ git clone https://github.com/fukarinka/ar-model-converter
$ cd ar-model-converter
$ npm install
```

## Usage

```bash
$ node index.js
```

or [build](#build) and run the binary file.

you can get the binary from releases folder

## Build

You need `pkg` for this.

```bash
$ npm install -g pkg
$ npm build
```
