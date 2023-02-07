module.exports = (req, res, next) => {
  const validPassword = (password) => {
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    let isRegexTrue = passwordRegex.test(password);
    isRegexTrue
      ? next()
      : res.status(400).json({
          message:
            "le mot de passe doit faire au minimum 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial",
        });
  };
  validPassword(req.body.password);
};
