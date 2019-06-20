'use strict'
const validator = require('validator');
const lodash = require('lodash');
const {User} = require('../models/User')


const errorConfig = {
    email: {},
    password: {},
}

const validateRegisterInput = async (data) => {
    let errors = {}
    //kiem tra xem input co bi bo trong hay khong
    //neu input ma bi bo trong thi cho no la ''
    // data.email = data.email ? data.email : "";
    data.email = lodash.get(data, 'email', '');
    data.password = lodash.get(data, 'password', '');
    data.password2 = lodash.get(data, 'password2', ''); //confirm password
    data.fullName = lodash.get(data, 'fullName', '');
    data.userType = lodash.get(data, 'userType', '');
    data.DOB = lodash.get(data, 'DOB', '');
    data.phone = lodash.get(data, 'phone', '');
    //lodash toPairs() chuyen tu object thanh array, fromPairs chuyen tu array thanh object
    //functional programming: pipe line lodash.chain
    //lodash.chain(data).toPairs().map().fromPairs()


    //validation
    //email
    if(validator.isEmpty(data.email)) { //true: '',false co gia tri
        errors.email = 'Email is required'
    } else if (!validator.isEmail(data.email)) {//true: 'hop le', email k hop le
        errors.email = 'Email is invalid'
    } else {
        const user = await User.findOne({email : data.email})
        if(user) errors.email = 'Email is exists'
        
    }
    //passowrd
    if(validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    } else if (!validator.isLength(data.password,{min: 6})) {
        errors.password = 'Password has at least 6 characters'
    }
    //password2
    if(validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required'
    } else if (data.password !== data.password2) {
        //!validator.equals(data.password,data.password2
        errors.password2 = 'Password is not match'
    }
    
    //DOB,fullName,userType
    if(validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required'
    } else {
        const user = await User.findOne({phone: data.phone});
        if(user) errors.phone = 'Phone is exists'
    }

    return {
        //isValid: true, errors la {}, isValid: alse khi errors co thuoc tinh
        isValid: lodash.isEmpty(errors),
        errors
    }
}

module.exports = validateRegisterInput;