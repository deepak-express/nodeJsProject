const route = require("express").Router();
const controller = require("./controller");
const { login, registration } = require("./middleWare/validation/index");
const validate = require("./middleWare/validate");
const passport = require("passport");
require("./middleWare/passport")(passport);

route.post("/registration", validate(registration), controller.registration);
route.post("/login", validate(login), controller.login);
route.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
route.patch(
  "/update/:postID",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
route.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  controller.get
);
route.delete(
  "/delete/:postID",
  passport.authenticate("jwt", { session: false }),
  controller.delete
);
route.get("/geoLocation", controller.latAndLong);
route.get("/activePost", controller.countActive);

module.exports = route;
