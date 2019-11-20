import { Request, Response, Router } from "express";
import { resolve } from "path";
import App from "../../app";
import { Post } from "../../helpers/decorators";
import { Token } from "../../helpers/Token";
import User from "../models/User";

const router = Router();
class RecoveryController {
    public router = router;

    @Post("/password/new", router)
    public async requestNewPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send("user not found");
            }

            const token = Token.createToken({ email }, process.env.SECRET);
            const pathTemplate = resolve(
                "lib",
                "app",
                "views",
                "mail",
                "recovery.html",
            );
            const mailState = App.mailer.sender(
                pathTemplate,
                [
                    { name: "name", value: user.name },
                    { name: "token", value: token },
                ],
                "Recuração de senha",
                user.email,
            );

            return res.send(mailState);
        } catch (err) {
            return res.status(400).send({ err });
        }
    }

    @Post("/password/confirm", router)
    public async newPassword(req: Request, res: Response) {
        try {
            const { authorization } = req.headers;
            const { password } = req.body;

            Token.verifyToken(
                authorization as string,
                process.env.SECRET,
                async (err, decoded) => {
                    if (err) {
                        return res.status(400).send("Invalid Token");
                    }

                    const user = await User.findOneAndUpdate(
                        { email: decoded.email },
                        {
                            $set: {
                                password,
                            },
                        },
                        { new: true },
                    );

                    return res.send(user);
                },
            );
        } catch (err) {
            return res.status(400).send({ err });
        }
    }
}

export default new RecoveryController().router;
