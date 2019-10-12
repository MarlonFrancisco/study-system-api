import { Document } from "mongoose";

export interface ILesson extends Document {
    name: string;
}