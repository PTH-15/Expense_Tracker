const mongoose = require('mongoose')
// mongoose.connect(`mongodb://127.0.0.1:27017/Expense_Tracker`)

const Expenses = mongoose.Schema({
    title:{type :String,required:true},
    category:{type :String,required:true},
    description:{type :String},
    amount:{type :Number,required:true},
    date:{type :Date,required:true},
    type:{type :String,required:true}
})


module.exports = mongoose.model("Expense",Expenses)
