const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const yaml = require('js-yaml');
const fs   = require('fs');
const http = require('http');
const https = require('https');

function loadFile(location) {
  return new Promise((resolve, reject) => {
    const httpCallback = (res) => {
      const chunks = [];
      res.on('data', chunk => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        let responseBody = Buffer.concat(chunks);
        resolve(responseBody);
      });
      res.on('error', (error) => {
        reject(error);
      });
    };
    if (location.startsWith('http://')) {
      http.get(location, httpCallback);
    } else if (location.startsWith('https://')) {
      https.get(location, httpCallback);
    } else {
      fs.readFile(location, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  });
}

async function loadSchema(location) {
  let rawSchema = await loadFile(location);
  return JSON.parse(rawSchema);
}

function loadData(path) {
  const rawData = fs.readFileSync(path, 'utf8');
  if (path.endsWith('.yaml') || path.endsWith('.yml')) {
    return yaml.load(rawData);
  }
  return JSON.parse(rawData);
}

module.exports = async function action(schemaLocation, dataLocations, strict = false) {
  const ajv = new Ajv({allErrors: true, strict: strict});
  addFormats(ajv);
  // Enable proper draft 06 support: https://ajv.js.org/guide/schema-language.html#draft-07-and-draft-06
  const draft6MetaSchema = require('ajv/dist/refs/json-schema-draft-06.json');
  ajv.addMetaSchema(draft6MetaSchema);

  const schema = await loadSchema(schemaLocation);
  for (const location of dataLocations) {
    const data = loadData(location);
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
      return ajv.errorsText(validate.errors);
    }
  }

  return null;
};
