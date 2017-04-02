console.log("Welcome to the Answer Model");
//=========================================
//------------- ANSWER MODEL ----------------
//=========================================

var mongoose = require ('mongoose'),
    Schema   = mongoose.Schema;

var AnswerSchema = new Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  _question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: {
    type: String,
    minlength: 5,
    required: true,
  },
  details: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  }
}, {timestamps: true});

mongoose.model('Answer', AnswerSchema);
