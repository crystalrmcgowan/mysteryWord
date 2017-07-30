const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const file = require("file-system")
const fs = require("fs")
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
const expressValidator = require("express-validator")

app.engine("mst", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mst")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let randomWord = words[Math.floor(Math.random()*words.length)]
console.log(randomWord);

app.get("/", (req, res) => {
  res.render("home", req.body)
})

app.listen(3000, (req, res) => {
  console.log("hey good lookin")
})
