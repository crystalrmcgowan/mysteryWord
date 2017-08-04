const express = require("express")
const app = express()

const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const expressValidator = require("express-validator")

const fs = require("fs")
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")

app.engine("mst", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mst")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let guess = []
let alreadyGuessed = []
let underscores = []
let count = 8
const PLACEHOLDER = '_'

const randomWord = words[Math.floor(Math.random()*words.length)]
console.log(randomWord);

const didTheyChooseALetter = (req, res, next) => {
  if (req.body.guess) {
    next()
  } else {
    res.render("noinput")
  }
}

const theyAreOverEightGuesses = (req,res, next) => {
  if (req.body.alreadyGuessed.length >= 8) {
    res.redirect('/noinput')
  }
  res.redirect("/")
}

const hangman = (randomWord, guesses) => {
  let output = ""
  for (let i = 0; i < randomWord.length; i++) {
    const letter = randomWord[i]
    if (guesses.includes(letter)) {
      output += letter
    } else {
      output += PLACEHOLDER
    }
  }
  return output
}

app.get("/", (req, res) => {
  res.render("home", {randomWord: randomWord})
})

app.use(didTheyChooseALetter)

app.post("/guessedALetter", (req, res) =>{
  res.redirect("/")
})

app.get("/noinput", (req, res) => {
  res.render("noinput")
})

app.use(theyAreOverEightGuesses)

app.listen(3000, (req, res) => {
  console.log("hey good lookin")
})

module.exports = { hangman }
