import mongoose from './../../data';
import { ILesson } from '../../typings/LessonModel';
import { Schema } from 'mongoose';

const LessonSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    created: {
        type: Date,
        default: new Date().toLocaleDateString(),    
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);

export default Lesson;