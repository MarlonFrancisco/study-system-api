import Subject from "./../models/Subject";
import { Router, Request, Response } from "express";
import { Post, Delete } from "../../helpers/decorators";
import User from "../models/User";
import { IRequest } from "../../typings/express";

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
                return res.status(400).send("User not founded");
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
                return res.status(400).send("User not founded");
            }

            if (!subject) {
                return res.status(400).send("Subject not founded");
            }

            await Subject.findByIdAndDelete(subject._id);
            user.subjects.splice(user.subjects.indexOf(req.userId), 1);

            await user.save();

            const subjects = await Subject.find({ user: req.userId });

            return res.send(subjects);
        } catch(err) {
            return res.status(400).send(err);
        }
    }
}

export default new SubjectController().router;