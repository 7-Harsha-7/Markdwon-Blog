const express = require("express")
const mongoose = require("mongoose")
const Article = require("./models/article")
const path = require('path')
const methodOverride = require("method-override")
const app = express()

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const articleRouter = require("./routes/articles")
app.engine('ejs', require('ejs').renderFile);
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride("_method"))


app.get("/", async (req,res) => {
    const articles = await Article.find().sort({createdAt: "desc"})
    res.render("articles/index", {articles: articles})
})

app.use("/articles", articleRouter)
 

app.listen(5000)