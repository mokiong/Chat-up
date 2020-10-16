import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from './utilities/constants';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';
import path from 'path';
import { Conversation } from './entities/Conversation';
import { Friend } from './entities/Friend';
import { Inbox } from './entities/Inbox';
import { Message } from './entities/Message';

const main = async () => {
   const PORT = parseInt(process.env.PORT as string) || 4000;

   const app = express();

   const conn = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: !__prod__, // synchronize false during prod
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [User, Conversation, Friend, Inbox, Message],
   });
   await Friend.delete({});
   // await conn.runMigrations();

   const RedisStore = connectRedis(session);
   const redis = new Redis(process.env.REDIS_URL);

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver],
         validate: false,
      }),
      // CONTEXT - a special object accesible by all reslovers
      context: ({ req, res }) => ({
         req,
         res,
      }),
      playground: !__prod__,
   });

   // Middlewares
   app.use(
      cors({
         origin: process.env.CORS_ORIGIN,
         credentials: true,
      })
   );

   app.use(
      session({
         name: COOKIE_NAME,
         store: new RedisStore({
            client: redis,
            disableTouch: true,
         }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true, // good for security, cant access cookie in js frontend
            sameSite: 'lax', // protecting csrf
            secure: __prod__, // cookie only works on https
            domain: __prod__ ? process.env.COOKIE_DOMAIN : undefined,
         },
         saveUninitialized: false,
         secret: process.env.SESSION_KEY as string,
         resave: false,
      })
   );
   apolloServer.applyMiddleware({
      app,
      cors: { origin: false },
   });

   app.listen(PORT, () => {
      console.log(`Server starting at localhost: 4000`);
   });
};

main().catch((err) => {
   console.error(err);
});
