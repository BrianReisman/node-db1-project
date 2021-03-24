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
  res.status(200).json(req.id);
});

router.post("/", async (req, res, next) => {
  console.log("[POST] /");
});

router.put("/:id", async (req, res, next) => {
  console.log("[PUT] /");
});

router.delete("/:id", async (req, res, next) => {
  console.log("[DELETE] /");
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
