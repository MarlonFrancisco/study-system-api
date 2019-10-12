import mongoose from './../../data';
import { Schema } from "mongoose";

const SubjectModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: new Date().toLocaleDateString(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Subject = mongoose.model("Subject", SubjectModel);

export default Subject;