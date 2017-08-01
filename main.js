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

let underscores = []
let guesses = []
let count = 8
const PLACEHOLDER = '_'

let randomWord = words[Math.floor(Math.random()*words.length)]
console.log(randomWord);

const didTheyChooseALetter = (req, res, next) => {
  if (req.body.guess) {
    console.log(underscores);
    next()
  } else {
    res.render("noinput")
  }
}

app.get("/", (req, res) => {
  res.render("home")
})

app.post("home", (req, res) => {
  res.render(randomWord)
})

app.use(didTheyChooseALetter)

app.listen(3000, (req, res) => {
  console.log("hey good lookin")
})
