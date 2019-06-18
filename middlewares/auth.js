const jwt = require('jsonwebtoken')

const authenticating = (req,res,next) => {
    // -veiry token  
    //   - thanh cong: return next
    //   - that bai: res.json(err)
  
    const token = req.header('Authorization');
    try {
      const decoded = jwt.verify(token,'Cybersoft')
      console.log('decoded: ', decoded)
      req.user = decoded
      next();
    }
    catch(error) {
      res.status(403).json({error: 'Failed'})
    }
  }

//User: passenger, driver, admin

const authorizing = (userTypeArray) => {
    console.log('Danh sach nguoi dung:', userTypeArray)
    return (req,res,next) => {
        const  {userType } = req.user 
        console.log('Nguoi dung hien tai:', userType)
        //userTypeArray danh sach cac loai nguoi dung co the truy cap
        // userType: nguoi dung hien tai (lay tu decoded cua token)
        // neu userTypeArray co chua userType ==> next

        if(userTypeArray.indexOf(userType) > -1)  {
            return next()
        } else {
            res.status(403).json({errors: 'Ban da dang nhap nhung khong co quyen xem dieu nay'})
        }
    }
}


  module.exports = {
      authenticating,authorizing
  }