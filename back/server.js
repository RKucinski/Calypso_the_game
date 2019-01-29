/* eslint-disable */
//Définition des modules

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var router = express.Router();
const bodyParser = require("body-parser");
const dbConnect = require('./config/auth')

//Connexion à la base de donnée

mongoose.connect(dbConnect.url, {
  auth: {
    user: dbConnect.Admin,
    password: dbConnect.password
  },
  useNewUrlParser:true
}, function(err, client) {
  if (err) {
    console.log(err);
  }
  console.log('Connexion sur : ' + dbConnect.url );
});

mongoose.Promise = global.Promise;

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(express.static(__dirname + "../front/build"));
app.use(express.static(__dirname + "/public"));


//Définition du routeur
app.use('/api/user', router);
require(__dirname + '/controllers/userController')(router);

function isAuth(req, res, next) {
    if (req.user)
        next()
    else
        res.sendStatus(500)
}

//Routes
app.use("/api/player", require("./routes/player"));
app.use("/api/creator", require("./routes/creator"));
app.use("/api/userProfile", require("./routes/userProfile"));
app.use("/api/map", require("./routes/map"));
app.use("/api/member", require("./routes/member"));

//On implémente un middleware pour nos messages d'erreur
app.use("/*", (req, res) => { res.sendFile(__dirname + "/public/index.html"); })

app.use(function(err, req, res, next) {
  res.status(500).send({ error: err.message });
});

//Définition et mise en place du port d'écoute
if (process.env.NODE_ENV === 'production') {
  let server = app.listen(process.env.PORT || 80, function () {
    console.log('Listening on port ' + server.address().port);
  });

  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/calypso.raindropslab.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/calypso.raindropslab.com/cert.pem')
  };

  https.createServer(options, app).listen(443);
} else {
  let server = app.listen(process.env.PORT || 8000, function () {
    console.log('Listening on port ' + server.address().port);
  });
}