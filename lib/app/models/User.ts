import { Schema } from "mongoose";

import mongoose from "../../data";
import { IUser } from "../../interfaces/UserModel";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 5,
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson",
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
    }],
    studyplan: {
        type: String,
        default: null,
    }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
