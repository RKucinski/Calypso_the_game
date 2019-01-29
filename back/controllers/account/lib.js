const passwordHash = require('password-hash');
const User = require('../../schema/schemaUser.js');

function signup(req, res) {
  if (!req.body.email || !req.body.password || !req.body.pseudo) {
    // Le cas où l'email, le password ou le pseudo ne serait pas soumit ou nul
    res.status(400).json({
      text: 'Requête invalide',
    });
  } else {
    const user = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: passwordHash.generate(req.body.password),
    };
    const findUser = new Promise((resolve, reject) => {
      User.findOne(
        {
          email: user.email,
        },
        (err, result) => {
          if (err) {
            reject(500);
          } else if (result) {
            reject(204);
          } else {
            resolve(true);
          }
        },
      );
    });

    findUser.then(
      () => {
        const _u = new User(user);
        _u.save((err, user) => {
          if (err) {
            res.status(500).json({
              text: 'Erreur interne',
            });
          } else {
            res.status(200).json({
              text: 'Succès',
              token: user.getToken(),
            });
          }
        });
      },
      (error) => {
        switch (error) {
          case 500:
            res.status(500).json({
              text: 'Erreur interne',
            });
            break;
          case 204:
            res.status(204).json({
              text: "L'adresse email existe déjà",
            });
            break;
          default:
            res.status(500).json({
              text: 'Erreur interne',
            });
        }
      },
    );
  }
}

function login(req, res) {
  if (!req.body.email || !req.body.password) {
    // Le cas où l'email ou bien le password ne serait pas soumit ou nul
    res.status(400).json({
      text: 'Requête invalide',
    });
  } else {
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) {
          res.status(500).json({
            text: 'Erreur interne',
          });
        } else if (!user) {
          res.status(401).json({
            text: "L'utilisateur n'existe pas",
          });
        } else if (user.authenticate(req.body.password)) {
          res.status(200).json({
            token: user.getToken(),
            text: 'Authentification réussi',
          });
        } else {
          res.status(401).json({
            text: 'Mot de passe incorrect',
          });
        }
      },
    );
  }
}

// On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
