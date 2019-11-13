# ar-model-converter

AR Model converter. Convert obj model to usdz and glTF.

- usdz conversion uses [`usdz_converter`](https://developer.apple.com/videos/play/wwdc2018/603/)
- glTF conversion uses [`obj2gltf`](https://github.com/AnalyticalGraphicsInc/obj2gltf)

Command line tool uses [`inquirer.js`](https://github.com/SBoudrias/Inquirer.js/)

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

Make sure you have prepared all the necessary textures for conversion like : 
- Diffuse
- Roughness
- Metallic
- Normal
- Emissive
- ORM (for glTF)

```bash
$ node index.js
```

or [build](#build) and run the binary file.

or you can get the binary from [releases](https://github.com/fukarinka/ar-model-converter/releases) folder

## Build

You need [`pkg`](https://github.com/zeit/pkg) for this.

```bash
$ npm install -g pkg
$ npm build
```
