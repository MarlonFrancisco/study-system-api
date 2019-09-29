import "dotenv/config";
import * as express from "express";
import User from "./app/controllers/UserController";
import auth from "./app/middlewares/auth";
import Auth from "./app/controllers/AuthController";
import { json, urlencoded } from "body-parser";
class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configs();
        this.middlewares();
        this.routes();
    }

    private configs(): void {
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
        this.app.listen(process.env.PORT, () => {
            console.log(`Port: ${process.env.PORT}`);
        });
    }

    private middlewares(): void {
        this.app.use("/user", auth);
    }

    private routes(): void {
        this.app.use("/auth", Auth);
        this.app.use("/user", User);
    }

    get App() {
        return this.app;
    }
}

export default new App();
