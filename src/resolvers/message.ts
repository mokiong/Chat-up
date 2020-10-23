import { Message } from '../entities/Message';
import {
   Arg,
   Ctx,
   FieldResolver,
   Int,
   Mutation,
   Query,
   Resolver,
   Root,
} from 'type-graphql';
import { MyContext } from '../utilities/types';
import { User } from '../entities/User';

@Resolver(Message)
export class MessageResolver {
   @FieldResolver(() => User)
   async user(@Root() message: Message): Promise<User> {
      const user = await User.findOne({
         where: { id: message.userId },
      });

      return user!;
   }

   //Queries
   @Query(() => [Message])
   async messages(): Promise<Message[]> {
      return await Message.find({});
   }

   //Mutations
   @Mutation(() => Boolean)
   async createMessage(
      @Arg('text') text: String,
      @Arg('channelId') channelId: String,
      @Ctx() { req }: MyContext
   ) {
      const message = await Message.create({
         text,
         userId: req.session.userId,
         channelId,
      }).save();

      if (!message) {
         return false;
      }

      return true;
   }

   @Mutation(() => Boolean)
   async deleteMessage(@Arg('id', () => Int) id: number) {
      await Message.delete({ id });
      return true;
   }
}
