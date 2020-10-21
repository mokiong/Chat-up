import { Message } from '../entities/Message';
import { Arg, Ctx, Int, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../utilities/types';

@Resolver(Message)
export class MessageResolver {
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
