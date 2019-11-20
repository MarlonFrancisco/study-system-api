import { Request, Response, Router } from "express";
import { Post } from "../../helpers/decorators";
import { Token } from "../../helpers/Token";
import User from "../models/User";
import app from "../../app";
import { resolve } from "path";

const router = Router();

class AuthController {
    public router = router;

    @Post("/create", router)
    public async create(req: Request, res: Response) {
        try {
            let user = await User.findOne({ email: req.body.email});

            if (user) {
                return res.status(400).send("User exists");
            }

            user = await User.create({...req.body});

            if (!user) {
                return res.status(400).send("User not created");
            }
            const pathTemplate = resolve("lib", "app", "views", "mail", "welcome.html");
            app.mailer.sender(pathTemplate, [{
                name: "name", value: user.name,
            }], "[LIGA DOS ESTUDANTES] Boas vindas", user.email);

            return res.send({
                user,
                token: Token.createToken({ id: user._id }, process.env.SECRET),
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }

    @Post("/login", router)
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email, password });

            if (!user) {
                return res.status(400).send("User not found");
            }

            return res.send({ user, token: Token.createToken({ id: user._id }, process.env.SECRET)});
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new AuthController().router;
