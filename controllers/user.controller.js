const mongoose = require('mongoose');

const User = mongoose.model('User');
const bcrypt = require('bcryptjs');


module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullname = req.body.fullname; 
    user.email = req.body.email ; 
    user.password = req.body.password ; 
    user.save((err,doc) => {
        if(!err){
            res.send(doc)
        }else{
            if(err.code == 11000){
                res.status(422).send(['Duplicate email']);
            }
            else 
                return next(err);
        }
    }); 
} 

module.exports.login = (req,res,next) => {
    console.log("Inside Login function")
    var email = req.body.email ;
    var password = req.body.password ; 
    User.find({ email : email},(err , doc ) =>{
        if(err) { console.log(err) }
        else{
            if(doc.length != 0){
                console.log(doc[0]);
                console.log(doc[0]._id);
                console.log(password)
                res.send(doc);
                
                bcrypt.hash(password, doc[0].saltSecret , (err,hash) => { // or use bcrypt.compareSync()
                    if(!err){
                        password = hash;
                        console.log(password+ " After hashing")
                        if(password === doc[0].password ){
                            console.log("User Loged in successfuly");
                        }else{
                            console.log("Wrong password");
                        }
                    }
                    else{
                        console.log(err)
                    }
                });

                
            }else{
                res.send(["No User Found"])
            }
        }
    })
}