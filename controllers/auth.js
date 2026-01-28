const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    throw new BadRequestError("Email and password required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Incorrect email or password");
  }

  const passIsCorrect = await user.checkPassword(password);
  if (!passIsCorrect) {
    throw new UnauthenticatedError("Incorrect email or password");
  }

  const token = user.createJWT();
  return res
    .status(StatusCodes.OK)
    .json({ user: { name: user.getName() }, token });
};

module.exports = { register, login };
