export const userSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["firstName", "lastName", "username", "password"],
  additionalProperties: false,
};