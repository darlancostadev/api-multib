const tv4 = require("tv4");

const statusSchema = require("./schemas/status.json");
tv4.addSchema("status", statusSchema);

const validate = (data, schema) => {
  const result = tv4.validateMultiple(data, schema);

  if (!result.valid) {
    let error = `Error to validate schema from request: ${JSON.stringify(
      data
    )}`;
    result.errors.forEach((element) => {
      if (element.dataPath) {
        error += ` - field: ${element.dataPath} - error: ${element.message}`;
      } else {
        error += ` - error: ${element.message}`;
      }
    });
    return { error };
  }

  return { valid: result.valid };
};

const defaultValidation = (req, res, next, options) => {
  const data = req.method === "GET" ? req.query : req.body;
  const result = validate(data, options.schema);
  if (!result.valid) {
    return res.status(400).send(result.error);
  }
  next();
};

module.exports = {
  validate,
};
