const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Heure: ", Date.now());
  next();
});

// définir la homepage du client
router.get("/customer", (req, res) => {
  res.send("Page Accueil Client");
});

// page compte client
router.get("/customer/account", (req, res) => {
  res.send("Page Compte Client");
});

module.exports = router;
