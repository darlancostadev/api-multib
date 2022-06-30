const tv4 = require("tv4");

const statusSchema = require("./schemas/status.json");
tv4.addSchema("statusSchema", statusSchema);

const validateData = (data, schema) => {
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

const validate = (data, schema) => {
  let result;
  if (Array.isArray(data)) {
    for (let index = 0; index < data.length; index += 1) {
      result = validateData(data[index], schema);
      if (!result.valid) {
        return result;
      }
    }
    return result;
  }
  result = validateData(data, schema);
  return result;
};

const defaultValidation = (req, res, options, next) => {
  const result = validate(req.body, options.schema);
  if (!result.valid) {
    return res.status(400).send(result.error);
  }
  next();
};;

const statusSchemaValidator = (req, res, next) => {
  defaultValidation(
    req,
    res,
    {
      message: "Validation error in status: %j",
      responseBody: "array",
      schema: statusSchema,
    },
    next
  );
};

module.exports = {
  validate,
  defaultValidation,
  statusSchemaValidator
};