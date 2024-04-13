import healthzRoute from "./healthz.js";
import userRoute from "./user.js";

const routes = (app) => {
  app.use("/healthz", healthzRoute);
  app.use("/v2/user", userRoute);
  app.use("*", function (request, response) {
    response.status(404).send();
  });
};

export default routes;
