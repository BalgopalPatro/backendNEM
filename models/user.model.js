const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : 'Full Name can\'t be khali'
    },
    email : {
        type : String,
        required : 'Email can\'t be Empty ',
        unique:true
    },
    password : {
        type : String,
        required : 'Password can\'t be Empty ',
        minlength : [4,'password must be atleast t charcter long'],
    },
    saltSecret: String
});

//custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ;
    return emailRegex.test(val);
},"Invalid Email")

// Pre events
userSchema.pre('save' , function(next) {
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password, salt , (err,hash) => {
            this.password = hash;
            this.saltSecret =salt ;
            next();
        });
    });
});

mongoose.model('User',userSchema);
