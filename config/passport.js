const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({email})
        .then(user =>{
          //沒該帳號
          if(!user) return done(null,false);

          bcrypt.compare(password,user.password)
          .then(isMatch =>{
            if(isMatch){
              return done(null,user);
            }
            // 密碼錯誤
            return done(null,false);  
          }) 

        })


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
