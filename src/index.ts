import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Channel } from './entities/Channel';
import { Message } from './entities/Message';
import { Participant } from './entities/Participant';
import { User } from './entities/User';
import { ChannelResolver } from './resolvers/channel';
import { UserResolver } from './resolvers/user';
import { COOKIE_NAME, __prod__ } from './utilities/constants';
import { Session as SessionEntity } from './entities/Session';
import { TypeormStore } from 'typeorm-store';
import { MessageResolver } from './resolvers/message';

const main = async () => {
   const PORT = parseInt(process.env.PORT as string) || 4000;

   const app = express();

   const conn = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: !__prod__, // synchronize false during prod
      logging: true,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [User, Channel, Participant, Message, SessionEntity],
   });

   // await User.delete({});
   // await Channel.delete({});
   // await conn.runMigrations();

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver, ChannelResolver, MessageResolver],
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
         store: new TypeormStore({ repository: SessionEntity as any }),
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
