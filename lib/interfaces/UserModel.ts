import { Document } from "mongoose";
import { ILesson } from "./LessonModel";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    subjects: string[];
    lessons: ILesson[];
    studyplan: string;
}
