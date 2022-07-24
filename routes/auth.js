const express = require("express");
const authController = require("./../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/request-reset-password", authController.getRequestResetPassword);
router.post("/request-reset-password", authController.postRequestResetPassword);
router.get("/password-reset", authController.getResetPassword);
router.post("/password-reset", authController.postResetPassword);

module.exports = router;
