const router = require("express").Router();

const SignupController = require("../controllers/auth/SignupController");
const SigninController = require("../controllers/auth/SigninController");
const EmailActivationController = require("../controllers/auth/EmailActivationController");
const ForgotPasswordController = require("../controllers/auth/ForgotPasswordController");
const ResetPasswordController = require("../controllers/auth/ResetPasswordController");

router.post("/signup", SignupController);

router.post("/signin", SigninController);

router.post("/forgotPassword", ForgotPasswordController);

router.post("/emailActivation", EmailActivationController);

router.post("/resetPassword", ResetPasswordController);

module.exports = router;
