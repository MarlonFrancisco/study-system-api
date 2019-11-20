import { NextFunction, Request, Response } from "express";

import { Token } from "../../helpers/Token";
import { IRequest } from "../../interfaces/express";

export default (req: IRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(400).send("Token no provider");
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
        return res.status(400).send("Token error");
    }

    const [type, token] = parts;

    if (type !== "Bearer") {
        return res.status(400).send("Token invalid");
    }

    Token.verifyToken(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send("Token invalid");
        }

        req.userId = decoded.id;

        next();
    });
};
