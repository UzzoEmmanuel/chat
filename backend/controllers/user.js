const User = require("../models/User");

const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

//-----------------------------------------------------------------------------------------------
//création d'un profil utilisateur.

exports.signup = (req, res, next) => {
  const hashedEmail = cryptojs
    .HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN)
    .toString(cryptojs.enc.Base64);

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        picture: "",
        email: hashedEmail,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) =>
          res.status(201).json({
            message: "utilisateur créé",
            token: jwt.sign({ userId: user.id }, process.env.SECRET_JWT_TOKEN),
            user: user,
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//-----------------------------------------------------------------------------------------------
//connexion à un profil utilisateur.

exports.login = (req, res, next) => {
  const hashedEmail = cryptojs
    .HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN)
    .toString(cryptojs.enc.Base64);

  User.findOne({ email: hashedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(403).json({ error: "mot de passe incorrect" });
          }
          res.status(200).json({
            message: "utilisateur vérifié",
            user,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_JWT_TOKEN),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//-----------------------------------------------------------------------------------------------
//accès à la liste des utilisateurs.

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error: error }));
};

//-----------------------------------------------------------------------------------------------
//accès à un profil d'un utilisateur.

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error: error }));
};

//-----------------------------------------------------------------------------------------------
//accès au profil utilisateur pour authentification côté frontend.

exports.getLoggedUser = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ authorization: false, message: "aucun token n'est trouvé" });

  jwt.verify(token, process.env.SECRET_JWT_TOKEN, function (error) {
    if (error)
      return res
        .status(500)
        .send({ authorization: false, message: "token non authentifié" });

    User.findOne({ _id: req.auth.userId })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(404).json({ message: "utilisateur non trouvé" });
      });
  });
};

//-----------------------------------------------------------------------------------------------
//modification des informations utilisateur.

exports.updateUser = (req, res, next) => {
  if (req.params.id === req.auth.userId) {
    User.findOne({ _id: req.params.id, userId: req.auth.userId })
      .then(() => {
        if (req.body.username.trim().length === 0) {
          res.status(400).json({ message: "le nom ne peut pas être vide" });
        } else {
          User.updateOne(
            { _id: req.params.id },
            { $set: { username: req.body.username } }
          )
            .then(() => {
              res.status(200).json({ message: "profil modifié" });
            })
            .catch((error) =>
              res.status(400).json({
                error: error,
                message: "le profil n'a pas pu être modifié",
              })
            );
        }
      })
      .catch(() => res.status(500).json({ message: "erreur serveur" }));
  } else {
    res.status(401).json({ message: "requête non authentifiée" });
  }
};

//-----------------------------------------------------------------------------------------------
//modification de la photo de profil utilisateur.

exports.updateUserPicture = (req, res, next) => {
  if (req.params.id === req.auth.userId) {
    User.findOne({ _id: req.params.id, userId: req.auth.userId })
      .then((user) => {
        if (!!user.picture) {
          const filename = user.picture.split("images/")[1];
          fs.unlink(`images/${filename}`, (error) => {
            //console.error(error);
          });
        } else {
          next;
        }
      })
      .then(() => {
        User.updateOne(
          { _id: req.params.id },
          { $set: { picture: req.file.path.replace(/\\/g, "/") } }
        )
          .then((user) =>
            res.status(200).json({ user, message: "photo de profil modifiée" })
          )
          .catch(() =>
            res
              .status(400)
              .json({ message: "la photo de profil n'a pas pu être modifiée" })
          );
      })
      .catch((error) => res.status(400).json({ error, message: "là" }));
  } else {
    res.status(401).json({ message: "requête non authentifiée" });
  }
};

//-----------------------------------------------------------------------------------------------
//suppression d'un profil utilisateur.

exports.deleteUser = (req, res, next) => {
  if (req.params.id === req.auth.userId) {
    User.findOne({ _id: req.params.id, userId: req.auth.userId })
      .then(() => {
        User.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "profil supprimé" });
          })
          .catch(() =>
            res
              .status(400)
              .json({ message: "le profil n'a pas pu être supprimé" })
          );
      })
      .catch(() => {
        res.status(500).json({ message: "erreur serveur" });
      });
  } else {
    res.status(401).json({ message: "requête non authentifiée" });
  }
};
