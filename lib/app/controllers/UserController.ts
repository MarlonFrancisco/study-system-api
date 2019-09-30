import { Request, Response, Router } from "express";
import { get } from "mongoose";
import User from "../models/User";
import { IRequest } from "../../typings/express";
const router = Router();

class UserController {
    public router = router;

    @get("/")
    public async get(req: IRequest, res: Response) {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(400).send("user not found");
            }

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new UserController().router;
