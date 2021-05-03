const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function verifyEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    sureName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!verifyEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least on Letter and one Number"
          );
        }
      },
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Check if Email is taken.
 * @param {string} email - The user's email.
 * @param {ObjectId} [excludeUserId] - The Id of the user to be excluded.
 * @return {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if saved password matched the user's password.
 * @param {string} password - password.
 * @return {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
