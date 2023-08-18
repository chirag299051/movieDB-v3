const {
  addToWatchlist,
  deleteFromWatchlist,
} = require("../Controllers/UserController");

const router = require("express").Router();

router.put("/add/:id", addToWatchlist);
router.delete("/delete/:id/:userId", deleteFromWatchlist);

module.exports = router;
