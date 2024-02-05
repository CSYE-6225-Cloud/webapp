import User from "../modules/user.js";
import { connection } from "../services/database.js";
import * as encryptFunction from "./auth/encrypt.js";
import userSchema from "./schema/userSchema.json" assert { type: "json" };
import userUpdateSchema from "./schema/userUpdateSchema.json" assert { type: "json" };
import { validate } from "jsonschema";

export const createUser = async (request, response) => {
  const dbConnection = await connection();
  if (!dbConnection) {
    response.status(503).send();
    return;
  } else {
    const validateJsonSchema = validate(request.body, userSchema);
    if (!validateJsonSchema.valid) {
      console.log("invalid json schema");
      response.status(400).send();
      return;
    }

    const existingUser = await User.findOne({
      where: { username: request.body.username },
    });

    if (existingUser) {
      console.log("user already exists");
      response.status(400).send();
      return;
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
      console.log("error=", error);
      response.status(400).send();
    }
  }
};

export const authorizeAndGetUser = async (request, response) => {
  const dbConnection = await connection();
  if (!dbConnection) {
    response.status(503).send();
    return;
  } else {
    try {
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader) {
        response.status(401).send();
        return;
      }

      const contentTypeLength = request.get("content-type")
        ? request.get("content-type").length
        : 0;

      if (
        contentTypeLength != 0 ||
        Object.keys(request.body).length != 0 ||
        Object.keys(request.query).length != 0
      ) {
        //Bad request since api is sending a body or has query params & check for head and options
        response.status(400).send();
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
        return;
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
  }
};

export const updateUser = async (request, response) => {
  const dbConnection = await connection();
  if (!dbConnection) {
    response.status(503).send();
    return;
  } else {
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
        return;
      }
      const comparePasswords = await encryptFunction.comparePasswords(
        password,
        existingUser.password
      );
      if (!comparePasswords) {
        response.status(401).send();
        return;
      }

      const validateJsonSchema = validate(request.body, userUpdateSchema);
      if (!validateJsonSchema.valid) {
        console.log("invalid json schema");
        response.status(400).send();
        return;
      }

      const updateUser = {};

      if (request.body.firstName) {
        updateUser.firstName = request.body.firstName;
      }
      if (request.body.lastName) {
        updateUser.lastName = request.body.lastName;
      }
      if (request.body.password) {
        const newHashedPassword = await encryptFunction.hashPassword(
          request.body.password
        );
        updateUser.password = newHashedPassword;
      }
      updateUser.account_updated = new Date().toISOString();

      if (Object.keys(updateUser).length > 0) {
        const updatedUser = await existingUser.update(updateUser);
        response.status(204).json(updatedUser).send();
        return;
      } else {
        response.status(400).send();
        return;
      }
    } catch {
      response.status(400).send();
    }
  }
};

//wrong routes
export const userOtherRoutes = (request, response) => {
  response.status(404).send();
};
