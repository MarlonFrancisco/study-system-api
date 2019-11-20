import { Request, Response, Router } from "express";
export function Get(route: string, router: Router) {
    return (target: any, name: any, description: any) => {
        router.get(route, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}
export function Post(route: string, router: Router) {
    return (target: any, name: any, description: any) => {
        router.post(route, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}

export function Delete(route: string, router: Router) {
    return (target: any, name: any, description: any) => {
        router.delete(route, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}

export function Put(route: string, router: Router) {
    return (target: any, name: any, description: any) => {
        router.put(route, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}
