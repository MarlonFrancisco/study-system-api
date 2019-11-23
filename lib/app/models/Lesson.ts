import { Schema } from "mongoose";
import mongoose from "../../data";
import { ILesson } from "../../interfaces/LessonModel";

const LessonSchema = new mongoose.Schema({
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

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);

export default Lesson;
