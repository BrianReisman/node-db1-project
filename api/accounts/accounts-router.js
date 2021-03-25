const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await Accounts.getAll();
    if (allAccounts) {
      res.status(200).json(allAccounts);
    } else {
      res.status(400).json({ message: "accounts could not be fetched" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  res.status(200).json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body);
      if (newAccount) {
        return res.status(201).json(req.body);
      } else {
        return res.status(400).json({ message: "unable to create account" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await Accounts.updateById(req.account.id, req.body);
      if (updated) {
        res.status(200).json(req.body);
        console.log(updated);
      } else {
        console.log(updated);
        res.status(400).json({ message: "item not updated" });
      }
    } catch (error) {
      next(error);
    }
    console.log("[PUT] /");
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deletedItem = await Accounts.deleteById(req.params.id);
    if (deletedItem) {
      res.status(200).json(req.account);
    } else {
      res.status(400).json({ message: "delete unsuccessful" });
    }
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  console.log(err.message);
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;

//
// 400 - rejection error. Bad request. The server will not accept/process this. "You shall not pass!"
// 404 - not found. Does not exist
// 500 - not something the client/users see or get sent back. Categorically **out of the user's control.**
//
