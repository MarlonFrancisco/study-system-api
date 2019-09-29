import { sign, verify } from "jsonwebtoken";
import {IPayloadToken} from "./../typings/payload";

export class Token {
    public static createToken(payload: IPayloadToken, secret: string): string {
        return sign(payload, secret, {
            expiresIn: 60000,
        });
    }

    public static verifyToken(token: string, secret: string, callback: (err: any, decoded: IPayloadToken) => void): void {
        verify(token, secret, (err, decoded: IPayloadToken) => {
            callback(err, decoded);
        });
    }
}