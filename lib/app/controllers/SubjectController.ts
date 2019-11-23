import { Request, Response, Router } from "express";
import { Delete, Get, Post } from "../../helpers/decorators";
import { IRequest } from "../../interfaces/express";
import Subject from "../models/Subject";
import User from "../models/User";

const router = Router();
class SubjectController {
    public router = router;

    @Post("/add", router)
    public async create(req: IRequest, res: Response) {
        try {
            const { name } = req.body;
            const user = await User.findById(req.userId);
            let subject = await Subject.findOne({ user: req.userId, name });

            if (!user) {
                return res.status(400).send("not found usered");
            }

            if (subject) {
                return res.status(400).send("Subject founded");
            }

            subject = await Subject.create({ name, user: req.userId });
            user.subjects.push(subject._id);

            await user.save();

            const subjects = await Subject.find({ user: req.userId });

            return res.send(subjects);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Delete("/", router)
    public async remove(req: IRequest, res: Response) {
        try {
            const { name } = req.body;
            const user = await User.findById(req.userId);
            const subject = await Subject.findOne({ user: req.userId, name });

            if (!user) {
                return res.status(400).send("not found usered");
            }

            if (!subject) {
                return res.status(400).send("Subject not founded");
            }

            await Subject.findByIdAndDelete(subject._id);
            user.subjects.splice(user.subjects.indexOf(req.userId), 1);

            await user.save();

            const subjects = await Subject.find({ user: req.userId });

            return res.send(subjects);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Get("/", router)
    public async get(req: IRequest, res: Response) {
        try {
            const subjects = await Subject.find({ user: req.userId });

            return res.send(subjects);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new SubjectController().router;
