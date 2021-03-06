const express = require("express");
const authController = require("./../controllers/auth");
const middleware = require("./../middleware/middleware");
const { check } = require("express-validator");

const router = express.Router();

router.get("/login", middleware.getFlashMessage, authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", middleware.getFlashMessage, authController.getSignup);
router.post("/signup", middleware.getFlashMessage, authController.postSignup);
router.get("/request-reset-password", authController.getRequestResetPassword);
router.post("/request-reset-password", authController.postRequestResetPassword);
router.get("/password-reset/:resetToken", authController.getResetPassword);
router.post("/password-reset/:resetToken", authController.postResetPassword);
router.get("/request-token-sent", authController.tokenSent);

module.exports = router;
