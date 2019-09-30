import mongoose from './../../data';
import { Schema } from 'mongoose';

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
    subjects: {
        type: Schema.Types.Array,
    },
    lessons: {
        type: Schema.Types.Array,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;