import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema({
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

    revoked: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;