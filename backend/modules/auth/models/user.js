import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    role: {
        type: mongoose.Schema.Types.ObecjId,
        ref: "Role",
    },

    company: {
        type: mongoose.Schema.Types.ObecjId,
        ref: "Company",
    },
    
    branch: {
        type: mongoose.Schema.Types.ObecjId,
        ref: "Branch",
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastLogin: {
        type: Date,
        default: null
    },
},

{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);

export default User;