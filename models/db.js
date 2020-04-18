const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{ useUnifiedTopology: true },(err) => {
    if(!err){ console.log('MOngoDB connected successfully'); }
    else {
        console.log("Error in mongo db connection "+ JSON.stringify(err,undefined,2));
    }
});

require('./user.model');
