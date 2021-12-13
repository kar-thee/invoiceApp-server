const joi = require("joi");

const signupSchema = joi.object({
  name: joi.string().min(3),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  email: joi.string().email(),
});

const signinSchema = joi.object({
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  email: joi.string().email(),
});

const forgotPwdSchema = joi.object({
  emailId: joi.string().email(),
});

const signupValidationFunc = (data) => {
  try {
    const value = signupSchema.validate(data);
    return value;
  } catch (e) {
    console.log(e.message, " err-signupValidationFunc");
    return e;
  }
};

const signinValidationFunc = (data) => {
  try {
    const { value } = signinSchema.validate(data);
    return value;
  } catch (e) {
    console.log(e.message, " err-signupValidationFunc");
    return e;
  }
};

const emailValidationFunc = (data) => {
  try {
    const { value } = forgotPwdSchema.validate(data);
    return value;
  } catch (e) {
    console.log(e.message, " err-signupValidationFunc");
    return e;
  }
};

module.exports = {
  signupValidationFunc,
  signinValidationFunc,
  emailValidationFunc,
};
