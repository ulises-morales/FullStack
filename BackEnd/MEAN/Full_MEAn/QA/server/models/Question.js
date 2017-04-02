console.log("Welcome to the Question Model");
//=========================================
//------------- Question MODEL ----------------
//=========================================

var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var QuestionSchema = new Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: String,
    required: true,
    minlength: 10,
  },
  description: {
    type: String,
  },
  answers: {
    type: Number,
    default: 0,
  },
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);
