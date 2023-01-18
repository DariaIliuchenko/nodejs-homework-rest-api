const { Schema, model} = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 5,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: String,
    default: "",
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
    "any.required": `Set password for user`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `Email is required`,
  }),
  subscription: Joi.string().required,
});
const loginSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
    "any.required": `Set password for user`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `Email is required`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
