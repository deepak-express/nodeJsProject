const User = require("../model/user.model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secretKey,
      },
      async function (jwt_payload, next, done) {
        const check = await User.findOne({ email: jwt_payload.email });
        //  console.log(check);
        if (!check) {
          return next(null, false);
        }
        if (check)  return next(null, check);
        else {
          next(err, false);
        }
      }
    )
  );
};
