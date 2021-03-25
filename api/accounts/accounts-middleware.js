const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    return res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    return res
      .status(400)
      .json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    return res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    req.body.name = name.trim();
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    let match = 0;

    accounts.forEach((account) => {
      if (account.name === req.body.name) {
        match++;
      }
    });

    if (match) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountById = await Accounts.getById(req.params.id);
    if (accountById) {
      req.account = accountById;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    next(err);
  }
};
