import { json, urlencoded } from "body-parser";
import * as cors from "cors";
import "dotenv/config";
import * as express from "express";
import Mailer from "jezzmailer/dist/Mailer";
import { IMailer } from "jezzmailer/lib";
import Auth from "./app/controllers/AuthController";
import Lesson from "./app/controllers/LessonController";
import Recovery from "./app/controllers/RecoveryController";
import StudyPlan from "./app/controllers/StudyPlanController";
import Subject from "./app/controllers/SubjectController";
import User from "./app/controllers/UserController";
import auth from "./app/middlewares/auth";
class App {
    public mailer: IMailer;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.mailer = new Mailer(
            process.env.EMAIL,
            process.env.PASSWORD,
            "gmail",
        );
        this.middlewares();
        this.server();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
    }

    private server(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Port: ${process.env.PORT}`);
        });
    }

    private routes(): void {
        this.app.use("/auth", Auth);
        this.app.use("/recovery", Recovery);
        this.app.use("/studyplan", [auth, StudyPlan]);
        this.app.use("/user", [auth, User]);
        this.app.use("/subject", [auth, Subject]);
        this.app.use("/lesson", [auth, Lesson]);
    }
}

export default new App();
