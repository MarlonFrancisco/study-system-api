import { Router, Response } from "express";
import { Put } from "../../helpers/decorators";
import User from "../models/User";
import { IRequest } from "../../typings/express";
import Lesson from "../models/Lesson";

const router = Router();
class LessonController {
    public router = router;
    
    @Put("/add", router)
    public async add(req: IRequest, res: Response) {
        try {
            const { name } =  req.body;
            let user = await User.findById(req.userId);
            let lesson = await Lesson.findOne({ name });

            if (!user) {
                return res.status(400).send("User not found");
            }

            if (lesson) {
                return res.status(400).send("Lesson exists");
            }

            lesson = await Lesson.create({ name, user: user._id });
            user.lessons.push(lesson._id);

            await user.save();
        
            return res.send(user.lessons);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Put("/remove", router)
    public async remove(req: IRequest, res: Response) {
        try {
            const { name } = req.body;
            const user = await User.findById(req.userId);
            const lesson = await Lesson.findOne({ user: req.userId, name });
            await Lesson.findOneAndDelete({ user: req.userId, name});
            
            if (!user) {
                return res.status(400).send("User not found")
            }

            user.lessons.splice(user.lessons.indexOf(lesson._id), 1);

            await user.save();

            return res.send(user.lessons);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new LessonController().router;