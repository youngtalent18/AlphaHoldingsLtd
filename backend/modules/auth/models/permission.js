import mongoose, {Schema} from "mongoose"

const permissionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    module: {
        type: String,
        required: true,
        trim: true
    },

    desciption: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
})

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;