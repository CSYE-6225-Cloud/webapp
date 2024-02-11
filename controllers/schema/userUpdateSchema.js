export const userUpdateSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  additionalProperties: false,
};
