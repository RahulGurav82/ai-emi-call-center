const express = require("express");
const {
  register,
  login,
  authMiddleware,
  logout,
} = require("../../controllers/auth/auth-controllers");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
