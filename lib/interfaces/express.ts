import { Request, Response } from "express";

export interface IRequest extends Request {
    userId?: string;
}