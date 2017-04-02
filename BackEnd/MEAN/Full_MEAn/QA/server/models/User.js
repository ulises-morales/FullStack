console.log("Welcome to the User Model");
//=========================================
//------------- USER MODEL ----------------
//=========================================

var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String, 
    required: true,
    minlength: 2
  }
}, {timestamps: true});

mongoose.model('User', UserSchema);
