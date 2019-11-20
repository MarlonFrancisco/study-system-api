import { Response, Router } from "express";
import { Get, Post } from "../../helpers/decorators";
import { IRequest } from "../../interfaces/express";
import User from "../models/User";

const router = Router();
class StudyPlanController {
    public router = router;

    @Get("/", router)
    public async get(req: IRequest, res: Response) {
        try {
            const user = await User.findById(req.userId);

            return res.send({plan: user.studyplan});
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/", router)
    public async save(req: IRequest, res: Response) {
        try {
            const user = await User.findById(req.userId);
            user.studyplan = req.body.plan;

            await user.save();

            return res.send(user);
        } catch (err) {
            return res.status(400).send({ err });
        }
    }
}

export default new StudyPlanController().router;
