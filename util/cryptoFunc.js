const bcrypt = require("bcrypt");

const encryptFunc = async (data) => {
  try {
    const encryptedPsw = await bcrypt.hash(data, 12);
    return encryptedPsw;
  } catch (e) {
    console.log(e.message, " err-encryptFunc");
    return e;
  }
};

const decryptFunc = async (plainPsw, encryptedPsw) => {
  try {
    const isValid = bcrypt.compare(plainPsw, encryptedPsw);
    return isValid;
  } catch (e) {
    console.log(e.message, " err-encryptFunc");
    return e;
  }
};

module.exports = { encryptFunc, decryptFunc };
