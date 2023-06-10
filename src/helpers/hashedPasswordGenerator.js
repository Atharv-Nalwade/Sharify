const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const bcrypt = require("bcrypt");
const saltRounds = process.env.Salt_Rounds;

const hashedPasswordGenerator = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      parseInt(saltRounds)
    );
    return hashedPassword;
  } catch (error) {
    console.log("Something went wrong in hashedPasswordGenerator.js");
    throw new Error(error);
  }
};

module.exports = hashedPasswordGenerator;
