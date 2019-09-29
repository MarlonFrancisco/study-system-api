import { Request, Response, Router } from "express";
const router = Router();

class UserController {
    public router = router;
}

export default new UserController().router;
