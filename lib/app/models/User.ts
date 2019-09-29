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
    subjects: [{
        type: String,
        unique: true,
    }],
    lessons: [{
        type: String,
        unique: true,
    }]
});

const User = mongoose.model("User", UserSchema);

export default User;