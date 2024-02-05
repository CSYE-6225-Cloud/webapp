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

export const authorizeAndGetUser = async (request, response) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      response.status(401).send();
      return;
    }
    const decodedCredentials = Buffer.from(
      authorizationHeader.split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");
    const username = decodedCredentials[0];
    const password = decodedCredentials[1];
    const existingUser = await User.findOne({
      where: { username: username },
    });
    if (!existingUser) {
      response.status(401).send();
    }
    const comparePasswords = await encryptFunction.comparePasswords(
      password,
      existingUser.password
    );
    if (!comparePasswords) {
      response.status(401).send();
      return;
    }
    const responseObject = {
      id: existingUser.id,
      first_name: existingUser.firstName,
      last_name: existingUser.lastName,
      username: existingUser.username,
      account_created: existingUser.createdAt.toISOString(),
      account_updated: existingUser.updatedAt.toISOString(),
    };
    response.status(200).json(responseObject).send();
  } catch {
    response.status(400).send();
  }
};
