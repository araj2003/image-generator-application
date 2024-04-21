const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = { hashPassword, comparePassword };