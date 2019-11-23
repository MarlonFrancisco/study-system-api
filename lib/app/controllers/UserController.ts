import { Request, Response, Router } from "express";
import { resolve } from "path";
import app from "../../app";
import { Get, Post } from "../../helpers/decorators";
import { IRequest } from "../../interfaces/express";
import User from "../models/User";

const router = Router();

class UserController {
    public router = router;

    @Get("/", router)
    public async get(req: IRequest, res: Response) {
        try {
            const user = await User.findById(req.userId).populate(["lessons", "subjects"]);

            if (!user) {
                return res.status(400).send("not found user");
            }

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/contactus", router)
    public async contactus(req: IRequest, res: Response) {
        try {
            const { subject, message } = req.body;

            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(400).send("Not found user");
            }
            const templatePath = resolve("lib", "app", "views", "mail", "contactus.html");
            const status = await app.mailer.sender(templatePath, [
                {name: "name", value: user.name },
                {name: "email", value: user.email },
                {name: "message", value: message},
            ], subject, process.env.EMAIL);

            return res.send(status);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new UserController().router;
