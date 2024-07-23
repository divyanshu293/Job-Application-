import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:[3,"Name must contain atlest 3 chars!"],
        maxLength:[30,"Name can't exceed 30 chars!"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email!"],
        // unique:[true,"Email address already taken"],
        validate: [validator.isEmail,"Please provide a valid email!"],
    },
    phone:{
        type: Number,
        required:[true,"Please provide your phone number"],
    },
    password:{
        type:String,
        required:[true,"please enter your password!"],
        minLength:[8,"Password must contain atlest 8 chars!"],
        maxLength:[32,"Password can't exceed 32 chars!"],
        Select:false,
    },
    role:{
       type:String,
       required:[true,"Please provide your role!"],
       enum: ["Job Seeker","Employer"],
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

// Hasing the password

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// comparing Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating a JWT token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

export const User = mongoose.model("User",userSchema);
