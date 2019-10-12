import mongoose from './../../data';
import { Schema, Types } from 'mongoose';
import { IUser } from '../../typings/UserModel';

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
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject"
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: "Lesson"
    }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;