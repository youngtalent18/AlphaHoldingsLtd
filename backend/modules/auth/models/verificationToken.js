import mongoose, { Schema } from "mongoose";

const verificationTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    },

    type: {
        type: String,
        enum: [
            "EMAIL_VERIFY",
            "PASSWORD_RESET",
        ],
        required: true
    }
},{
    timestamps: true,
});

const verificationToken = mongoose.model("verificationToken", verificationTokenSchema);
export default verificationToken;