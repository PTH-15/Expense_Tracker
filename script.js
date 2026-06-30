const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/Expense_Tracker`)
const User = require("./models/user")
const Expenses = require("./models/expenses")
const { register } = require('module')
const { error } = require('console')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('home')
})
app.get("/login", (req, res) => {
    res.render('login')
})
app.post("/login",(req,res)=>{
    console.log("email", req.body.email);
    console.log("passwords",req.body.password);
    
})
app.get("/register", (req, res) => {
    res.render('register')
})
app.post("/register",async (req, res) => {

    const { name, email, password, confirmPassword} = req.body
    if (password !== confirmPassword) {
        return res.render("register",{error:"Password ain't matching ngga"});
    } 
    const existingUser = await User.findOne({email})
    if(existingUser) {
        return res.render("register", { error: "Email Already Exists!!!" }) 
    }
    const newUser = await User.create({
        name,
        email,
        password
    })
   console.log(newUser)
   res.redirect("/login")
});
app.get('/users',async (req,res)=>{
    const users = await User.find()
    res.send(users)
})
app.get("/user/:email", async (req,res)=>{
    const user = await User.findOne({email:req.params.email})
    res.send(user)
})
app.get("/update/:email", async (req,res)=>{
    const Updated = await User.findOneAndUpdate({email:req.params.email},{name:req.body.name},{returnDocument:"after"})
    res.send(Updated)
})
app.get("/delete/:email",async(req,res)=>{
    const deleteuser = await User.findOneAndDelete({email:req.params.email})
    res.send(deleteuser)
})

app.get("/transaction",async (req,res)=>{
    console.log(req.query)
    let query = {}
    if (req.query.type){
        query.type= req.query.type
    }
    if (req.query.category){
        query.category= req.query.category
    }
    if (req.query.search){
        query.title={
            $regex:req.query.search,
            $options:"i"
        }
    }
    let transaction = Expenses.find(query)
    if (req.query.sort === "newest") {
        transaction = transaction.sort({ date: -1 });
    }

    if (req.query.sort === "oldest") {
        transaction = transaction.sort({ date: 1 });
    }

    if (req.query.sort === "amount-high") {
        transaction = transaction.sort({ amount: -1 });
    }

    if (req.query.sort === "amount-low") {
        transaction = transaction.sort({ amount: 1 });
    }
    transaction = await transaction
    res.render("transaction",{transaction,
        categoryVal: req.query.category,
        typeVal: req.query.type,
        sortVal: req.query.sort,
        searchVal: req.query.search})
})
app.post("/transaction/add",async (req,res)=>{
    const newexpense = await Expenses.create(req.body)
    res.redirect("/transaction")
})


app.listen(3000)