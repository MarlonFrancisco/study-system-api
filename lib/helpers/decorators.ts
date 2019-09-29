import { Request, Response, Router } from "express";
export function Post(route: string, router: Router) {
    return (target: any, name: any, description: any) => {
        router.post(route, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}