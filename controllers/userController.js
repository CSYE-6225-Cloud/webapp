import User from "../modules/user.js";
import * as encryptFunction from "./auth/encrypt.js";
import userSchema from "./schema/userSchema.json" assert { type: "json" };
import { validate } from "jsonschema";

export const createUser = async (request, response) => {
  const validateJsonSchema = validate(request.body, userSchema);
  if (!validateJsonSchema.valid) {
    console.log("invalid json schema");
    response.status(400).send();
  }

  const existingUser = await User.findOne({
    where: { username: request.body.username },
  });

  if (existingUser) {
    console.log("user already exists");
    response.status(400).send();
  }

  try {
    const currentHashedPassword = await encryptFunction.hashPassword(
      request.body.password
    );

    const newUser = await User.create({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      username: request.body.username,
      password: currentHashedPassword,
    });

    const responseObject = {
      id: newUser.id,
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      username: newUser.username,
      account_created: newUser.createdAt.toISOString(),
      account_updated: newUser.updatedAt.toISOString(),
    };

    response.status(201).json(responseObject).send();
  } catch (error) {
    response.status(400).send();
  }
};
