import { MongoEntityManager } from "typeorm";

export type MyContext = {
   req: Request & { session: Express.Session };
   res: Response;
   conn: MongoEntityManager;
}