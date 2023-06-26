const Elements = require("../database/elementSchema");

function makejson(data) {
  data = typeof data == "string" ? removeComma(data).split(",") : data;
  var json = "{";
  data.forEach((d) => (json += `"${d}":1,`));
  json = json.slice(0, -1) + "}";
  console.log(JSON.parse(json));
  return JSON.parse(json);
}

function mergejson(jsons) {
  if (jsons.length < 2) return jsons[0];
  var output = "";
  for (let i = 0; i < jsons.length; i++) {
    if (i == 0) {
      output += JSON.stringify(jsons[i]).slice(0, -1);
    } else if (i < jsons.length - 1) {
      output += "," + JSON.stringify(jsons[i]).slice(1, -1);
    }
    if (i == jsons.length - 1) {
      output += "," + JSON.stringify(jsons[i]).slice(1);
    }
  }
  output = output.replace(",,", ",").replace(",}", "}");
  return JSON.parse(output);
}

const removeComma = (str) =>
  str
    .split(",")
    .filter((elem) => elem != "")
    .join(",");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


// Handle Request Export function
function handleRequest(req, res, filterName = "", errMsg="", singleElement=false) {
  // required query (?r=...)
  r = req.query.r ? makejson(req.query.r) : null;

  // filter data
  filterContent = filterName ? req.params[filterName] : null;
  filter = {};
  if (filterContent) filter[filterName] = filterContent;

  // projection
  projection = r ? mergejson([{ _id: 0 }, r]) : { _id: 0 };

  try {
    // if singleElement then output will be single document, not array of one document
    ((singleElement) ? Elements.findOne(filter, projection) : Elements.find(filter, projection))
      .sort({ atomicNumber: 1 })
      .then((doc) =>
        doc.length == 0
          ? res.status(400).send({ msg: errMsg ? errMsg : "Item Not Found" })
          : res.send(doc)
      );
  } catch (err) {
    res.status(500).send({ msg: "unkown error occured", err });
  }
}

module.exports =  {handleRequest, capitalize}
