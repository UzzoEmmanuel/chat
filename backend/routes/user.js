const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const checkEmail = require("../middlewares/check-email");
const checkPassword = require("../middlewares/check-password");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

//-----------------------------------------------------------------------------------------------
//création d'un profil utilisateur.
router.post("/signup", checkEmail, checkPassword, userCtrl.signup);

//connexion à un profil utilisateur.
router.post("/login", userCtrl.login);

//accès à la liste des utilisateurs.
router.get("/users", auth, userCtrl.getUsers);

//accès au profil utilisateur pour authentification côté frontend.
router.get("/loggedUser", auth, userCtrl.getLoggedUser);

// accès à un profil d'un utilisateur.
router.get("/user/:id", auth, userCtrl.getUser);

//modification des informations utilisateur.
router.put("/user/:id", auth, userCtrl.updateUser);

//modification de la photo de profil utilisateur.
router.put("/user/:id/picture", auth, multer, userCtrl.updateUserPicture);

//suppression d'un profil utilisateur.
router.delete("/user/:id", auth, userCtrl.deleteUser);

//-----------------------------------------------------------------------------------------------
module.exports = router;
