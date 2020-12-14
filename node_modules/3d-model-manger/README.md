# 3D Model Manger

## About
<a name="About"></a>


3D Model Manger is an NPM package for managing 3d models.

## Table Of Contents
<a name="TOC"></a>

* [About](#About)
* [Table Of Contents](#TOC)
* [Install](#Install)
* [Usage](#Usage)
* [Docs](#Docs)
  * [readModel](#readModel)
  * [parseRead](#parseRead)

## Install
<a name="Install"></a>

Type in `$ npm install 3d-model-manger` in you shell.

## Usage
<a name="Usage"></a>


```javascript
const modelManger = require('3d-model-manger'); // imports 3d-model-manger
const modelPath = "cube.obj"; // enter your model path here! (currently only supports .obj files)

console.log(parseRead(readModel("cube.obj"))); // returns object with vertex data and class data
```

## Docs
<a name="Docs"></a>


* [readModel](#readModel)
* [parseRead](#parseRead)

### readModel
<a name="readModel"></a>

Reads file data from 3d model files (obj) and returns an array

**Syntax:** `readModel(filePath)`

**Parameters:**

Parameter | Type | Default | Description
:-:|:-:|:-:|:-:
**filePath** | *String* | &#x274C; | The Path of the read file

**Example:**

```javascript
const modelManger = require('3d-model-manger'); // imports 3d-model-manger
const modelPath = "cube.obj"; // enter your model path here! (currently only supports .obj files)

console.log(readModel("cube.obj"));
/* returns : {
  modelType: 'obj',
  modelData: "# Blender v2.76 (sub 0) OBJ File: ''\n" +
    '# www.blender.org\n' +
    'mtllib cube.mtl\n' +
    'o Cube\n' +
    'v 1.000000 -1.000000 -1.000000\n' +
    'v 1.000000 -1.000000 1.000000\n' +
    'v -1.000000 -1.000000 1.000000\n' +
    'v -1.000000 -1.000000 -1.000000\n' +
    ...
  }
*/
```


### parseRead
<a name="parseRead"></a>

Parses the object given by the `readModel()` function and converts it into an easy-to-use object

**Syntax:** `parseRead(Modeldata, [options])`

**Parameters:**


Parameter | Type | Default | Description
:-:|:-:|:-:|:-:
**Modeldata** | *String* | &#x274C; | The Path <br /> of the read file
**options** | *Object* | &#x2714; | options

**Example:**

```javascript
const modelManger = require('3d-model-manger'); // imports 3d-model-manger
const modelPath = "cube.obj"; // enter your model path here! (currently only supports .obj files)

console.log(parseRead(readModel("cube.obj")));
/* returns : {
     Vertices: [[Vertex], [Vertex], [Vertex], [Vertex], etc],
     Faces: [[Face], [Face], [Face], [Face], etc]
  }
*/
```
