import { Request, Response, Router } from "express";
import { Get } from "../../helpers/decorators";
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
                return res.status(400).send("user not found");
            }

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new UserController().router;
