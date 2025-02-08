import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true },
   password: String,
});

// Hash password before saving
userSchema.pre("save", function (next) {
   if (!this.isModified("password")) return next();
   this.password = bcrypt.hashSync(this.password, 10);
   next();
});

export default mongoose.model("User", userSchema);
