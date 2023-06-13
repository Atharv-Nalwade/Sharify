const path = require("path");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const saltRounds = process.env.Salt_Rounds;

const hashedPasswordGenerator = async (plainPassword) => {
  try {
    console.log("plainPassword", plainPassword, "saltRounds", saltRounds);
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      parseInt(saltRounds)
    );
    return hashedPassword;
  } catch (error) {
    console.log("Something went wrong in hashedPasswordGenerator");
    throw new Error(error);
  }
};

const passwordVerify = async (IncomingPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(IncomingPassword, hashedPassword);
    if (result) {
      return true;
    } else {
      console.log("Wrong Password enetered");
      throw new Error("Wrong Password enetered");
    }
  } catch (error) {
    console.log("Something went wrong in passwordVerify ");
  }
};

module.exports = {
  hashedPasswordGenerator,
  passwordVerify,
};
