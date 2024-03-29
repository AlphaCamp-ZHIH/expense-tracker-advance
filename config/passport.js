const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email }).then((user) => {
          //沒該帳號
          if (!user)
            return done(null, false, req.flash("warning_msg", "該帳號不存在"));

          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
              return done(null, user);
            }
            // 密碼錯誤
            return done(
              null,
              false,
              req.flash("warning_msg", "請輸入正確密碼")
            );
          });
        });
      }
    )
  );

 passport.use(
   new FacebookStrategy(
     {
       clientID: process.env.FACEBOOK_ID,
       clientSecret: process.env.FACEBOOK_SECRET,
       callbackURL: process.env.FACEBOOK_CALLBACK,
       profileFields: ["email", "displayName"],
     },
     (accessToken, refreshToken, profile, done) => {
       const { name, email } = profile._json;
      return  User.findOne({ email }).then((user) => {
         if (user) return done(null, user);
         const randomPassword = Math.random().toString(36).slice(-8);
         bcrypt
           .genSalt(10)
           .then((salt) => bcrypt.hash(randomPassword, salt))
           .then((hash) =>
             User.create({
               name,
               email,
               password: hash,
             })
           )
           .then((user) => done(null, user))
           .catch((err) => done(err, false));
       });
     }
   )
 );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => done(null, user));
  });
};
