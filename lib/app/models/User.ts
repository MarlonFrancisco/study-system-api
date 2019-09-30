import mongoose from './../../data';
import { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    subjects: {
        type: Schema.Types.Array,
    },
    lessons: {
        type: Schema.Types.Array,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;