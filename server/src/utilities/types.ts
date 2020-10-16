import { MongoEntityManager } from 'typeorm'
import { createFriendLoader } from './createFriendLoader'

export type MyContext = {
   req: Request & { session: Express.Session }
   res: Response
   conn: MongoEntityManager
   userLoader: ReturnType<typeof createFriendLoader>
}
