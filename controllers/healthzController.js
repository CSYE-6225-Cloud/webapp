import { connection } from "../services/database.js";

export const healthzHeadOptions = async (request, response) => {
  response.status(405).send();
};

export const healthzGet = async (request, response) => {
  const dbConnection = await connection();
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

  if (dbConnection) {
    //Successfull db connection with no payload and no query params
    response.status(200).send();
  } else {
    //Database connection failed
    response.status(503).send();
  }
};

//deny methods other than GET
export const heathzAllMethods = (request, response) => {
  if (request.method != "GET") {
    response.status(405).send();
  }
};

//wrong routes
export const heathzOtherRoutes = (request, response) => {
  response.status(404).send();
};
