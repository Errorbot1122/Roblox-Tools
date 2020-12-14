/* Defantions */
/**
  * @description a 3D model manger for node.js
  * @module 3D-Model-Manger
  */


const mime = require('mime-types');
const fs = require('fs');

let vertexArray = []
let faceArray = []


function IsString(x) {
  return (typeof x === 'string' || x instanceof String)
}
function IsNumber(x) {
  return (typeof x === 'number' || x instanceof Number)
}
function IsBool(x) {
  return (typeof x === 'boolean' || x instanceof Boolean)
}
function IsObject(x) {
  return (typeof x === 'object' || x instanceof Object)
}

function filterRegex(array, regex, isReverse = true) {

  let arrayFilterd = array.filter((elem, i) => {
    if (IsString(elem)) {
      if (isReverse) {

        return !regex.test(elem)
      }
      else {

        return regex.test(elem)
      }
    }
    else {

      if (isReverse) {

        return true
      }
      else {

        false
      }
    }
  });
  return arrayFilterd;
};
function objLineToClass(item, type) {
  let output
  if (!IsString(item)) {return}
  let data = item.trim().split(" ");
  if (!IsString(type))  {
    type = data[0]
  }

  switch (type) {
    case "v":
      output = new Vertex(data[1], data[2], data[3], (data[4] != null) ? data[4] : null)
      break;
    case "f":
      vNumbers = [data[1].split("/")[0], data[2].split("/")[0], data[3].split("/")[0], (data[4] != null) ? data[4].split("/")[0] : null]
      output = new Face(vertexArray[parseInt(vNumbers[0])], vertexArray[parseInt(vNumbers[1])], vertexArray[parseInt(vNumbers[2])], (vNumbers[3] != null) ? vertexArray[parseInt(vNumbers[3])] : null)
      break;
    default:
      output = false;
      break;
  }
  return output;
};

class Vector {
  constructor(...values) {
    this.values = values
  }
}
class Vector3 extends Vector {
  constructor(x, y, z) {
    super(x, y, z)
    this.x = this.values[0]
    this.y = this.values[1]
    this.z = this.values[2]
  }
}
class Vertex extends Vector3 {
  constructor(x, y, z, w = 1) {
    super(x, y, z)
    this.w = w
  }
}

class BasePolygon {
  constructor(...vertices) {
    this.vertices = vertices[0]
  }
}
class Polygon extends BasePolygon {
  constructor(...vertices) {
    super(vertices)
  }
}
class Face extends Polygon{
  constructor(v1, v2, v3, v4) {
    super(v1, v2, v3, v4);
    this.v1 = this.vertices[0];
    this.v2 = this.vertices[1];
    this.v3 = this.vertices[2];
    this.v4 = this.vertices[3];
  }
}

/**
  * @function readModel
  * @description Reads file data from 3d model files (obj)
  *
  * @param  {String} filePath The path of a file
  *
  * @returns {String[]}  Each line of the file
  */
function readModel(filePath) {
  let fileExists = fs.existsSync(filePath)

  if (fileExists == true) {

    let contentType = mime.lookup(filePath).split("/");
    let fileData = fs.readFileSync(filePath, "utf8");

    if (contentType[0] == "model") {
    return {
            modelType: contentType[1],
            modelData: fileData,
          };

    }
    else {
      throw new Error(`the file ${filePath.split("/")[filePath.split("/").length - 1]} at ${filePath} is not a 3d model file`);
    }
  }
  else {
      throw new Error(`The file ${filePath.split("/")[filePath.split("/").length - 1]} dose not exist at file path: ${filePath}`)
  }
};

/**
  * @function parseRead
  * @description Parses the array given by the readModel() function
  *
  * @param  {String[]} Modeldata The path of a file
  * @param  {Object}  [options] options
  *
  * @returns {{Vertices: Vertex[], Faces: Face[]}}  Each line of the file
  */
function parseRead(Modeldata, options) {
  let keepComments = false;
  let returnObject = {
    Vertices: [],
    Faces: []
  }

  if (IsObject(options)) {
    let keepComments = (IsBool(options.keepComments)) ? options.keepComments : false
  }

  let modelDataArray = Modeldata.modelData.trim().split("\n");


  if (!keepComments) {
    let modelDataArrayFilterd = filterRegex(modelDataArray, /^#/);

    modelDataArray = modelDataArrayFilterd;
  }

  modelDataArray.forEach((item, i) => {

    if (IsString(item)) {
      let newItem = objLineToClass(item)

      if (newItem instanceof Vertex) {
        vertexArray.push(newItem)
      }
      else if (newItem instanceof Face) {
        faceArray.push(newItem)
      }
    }
  });

  returnObject.Vertices = vertexArray;
  returnObject.Faces = faceArray;
  return returnObject;
};

/* Testing */

//console.log(parseRead(readModel("cube.obj")));

/* Exports */

  /* Export Functions */
module.exports.readModel = readModel;
module.exports.parseRead = parseRead;

  /* Export Classes */
module.exports.classes = {}
    /* Vertex Stuff */
module.exports.classes.Vector = Vector;
module.exports.classes.Vector3 = Vector3;
module.exports.classes.Vertex = Vertex;

    /* Shape Stuff */
module.exports.classes.BasePolygon = BasePolygon;
module.exports.classes.Polygon = Polygon;
module.exports.classes.Polygon = Face;
