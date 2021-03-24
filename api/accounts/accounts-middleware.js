const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (name.trim().length < 3) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget > 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
// call the model
  // - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database
};

exports.checkAccountId = async (req, res, next) => {
  try{
    const accountById = await Accounts.getById(req.params.id)
    if(accountById){
      req.id = accountById
      next()
    } else {
      res.status(404).json({ message: "account not found" })
    }
  } catch (err) {
    next(err)
  }
};