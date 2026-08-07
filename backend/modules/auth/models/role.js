import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    desciption: {
        type: String,
        default: "",
    },

    permission: [
        {
            type: Schema.Types.ObjectId,
            ref: "Permission",
        }
    ],

    isSystemRole: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Role = mongoose.model("Role", roleSchema);
export default Role;