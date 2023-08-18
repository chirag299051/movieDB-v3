const User = require("../Models/UserModel");

module.exports.addToWatchlist = async (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  User.updateOne({ _id: req.params.id }, { $addToSet: { watchlist: req.body } })
    .then((res) => {
      console.log("watchlist updated successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.deleteFromWatchlist = async (req, res, next) => {
  const userId = req.params.userId;
  const itemIdToDelete = req.params.id;

  User.updateOne(
    { _id: userId },
    { $pull: { watchlist: { id: itemIdToDelete } } }
  )
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: "User or item not found" });
      }
      console.log(JSON.stringify(result));
      console.log(" Item deleted from watchlist successfully");
      return res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      if (err) {
        console.error("Error deleting item from watchlist:", err);
        return res.status(500).json({ error: "An error occurred" });
      }
    });
};

//   const userId = req.params.userId;
//   const itemIdToDelete = req.params.id;
//   User.findOne({ _id: userId })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       //
//       console.log(user.watchlist.length);
//       user.watchlist = user.watchlist.filter(
//         (item) => item.id !== itemIdToDelete
//       );
//       user.markModified("watchlist");
//       console.log(user.watchlist.length);

//       return user.save();
//     })
//     .then((updatedUser) => {
//       console.log("Item removed from watchlist and user updated successfully");
//       return res.status(200).json({ message: "Item removed and user updated" });
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(500).json({ error: "An error occured" });
//     });
