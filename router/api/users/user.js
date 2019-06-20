
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const validateRegisterInput = require('../../../validation/validate-register-input')

//middleware


const { User } = require("../../../models/User");
//router POST/api/user/register
//desc register new user
//access PUBLIC

 const register = async (req,res,next) => {
  const { email, password, fullName, userType, phone, DOB } = req.body;

  //su dung validate
  const {isValid, errors} = await validateRegisterInput(req.body)

  if(!isValid) return res.status(400).json(errors);
  //gia dinh: input valid
  // User.findOne({ $or: [{ email }, { phone }] })
  //   .then(user => {
  //     if (user) return Promise.reject({ errors: "Email exists" });

      const newUser = new User({
        email,
        password,
        fullName,
        userType,
        phone,
        DOB
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) return Promise.reject(err);

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return Promise.reject(err);

          newUser.password = hash;
          return newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err));
        });
      });
//     })
//     .catch(err => res.status(400).json(err));
}


//router POST/api/user/login
//desc login
//access PUBLIC
 const login = (req,res,next) => {
  const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) return Promise.reject({ errors: "User does not exsits" });
  
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (!isMatch) return res.status(400).json({errors: 'Password was wrong'})
          const payload = {
            id: user._id,
            email : user.email,
            fullName : user.fullName,
            userType : user.userType
          }
  
          jwt.sign(payload,'Cybersoft', {expiresIn: '1h'}, (err, token) => {
            if(err) return res.status(400).json(err)
              res.status(200).json({
                message: "Success",
                token: token
              });
          })
        });
      })
      .catch(err => res.status(400).json(err));
}

 const testPrivate = (red,res,next) => {
     res.status(200).json({message: 'Log in successed'})
}
// router.post("/login", (req, res) => {
//   
// });

const uploadAvatar = (req,res,next) => {
  const { id } = req.user;
    console.log('ID', id)
    User.findById(id)
      .then(user => {
        if (!user) return Promise.reject({ errors: "User doee not exsits" });

        user.avatar = req.file.path;
        return user.save();
      })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
}

//router POST/api/user/test-private
//desc text private
//access private(chi cho nhung user loged in)


// router.get('/test-private',authenticating,authorizing(['passenger','admin']) ,(req,res) => {
//   res.status(200).json({message: 'Log in successed'})
// } )

module.exports = {
  register, login, testPrivate, uploadAvatar
}