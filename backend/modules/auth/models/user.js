import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true 
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true 
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    phone:{
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },

    profileImg: {
        type: String,
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