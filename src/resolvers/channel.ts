import {
   Arg,
   Ctx,
   Field,
   FieldResolver,
   Mutation,
   ObjectType,
   Query,
   Resolver,
   Root,
} from 'type-graphql';
import { v4 } from 'uuid';
import { Channel } from '../entities/Channel';
import { Message } from '../entities/Message';
import { Participant } from '../entities/Participant';
import { User } from '../entities/User';
import { MyContext } from '../utilities/types';

@ObjectType()
class ChannelOutput {
   // ? means undefined
   @Field({ nullable: true })
   error?: string;

   @Field(() => Channel, { nullable: true })
   channel?: Channel;
}

@Resolver(Channel)
export class ChannelResolver {
   @FieldResolver(() => [User])
   async users(@Root() channel: Channel): Promise<User[]> {
      const participants = await Participant.find({
         where: { channelId: channel.id },
         relations: ['user'],
      });
      let userArray: User[] = [];

      participants.forEach((element) => {
         userArray.push(element.user);
      });

      return userArray;
   }

   @FieldResolver(() => [Message])
   async messages(@Root() channel: Channel): Promise<Message[]> {
      return await Message.find({
         where: { channelId: channel.id },
         relations: ['user'],
      });
   }

   // Queries
   @Query(() => [Channel])
   async channels(): Promise<Channel[]> {
      const channels = await Channel.find({});
      return channels;
   }

   @Query(() => ChannelOutput)
   async channel(@Arg('name') channelName: String): Promise<ChannelOutput> {
      const channel = await Channel.findOne({ where: { name: channelName } });
      if (!channel) {
         return {
            error: 'Channel not found',
         };
      }

      return { channel };
   }

   // Mutations
   @Mutation(() => Channel)
   async createChannel(@Arg('name') channelName: String): Promise<Channel> {
      const code = v4();

      return await Channel.create({
         name: channelName,
         id: code,
      }).save();
   }

   @Mutation(() => Participant)
   async joinChannel(
      @Arg('id') channelId: String,
      @Ctx() { req }: MyContext
   ): Promise<Participant> {
      return await Participant.create({
         channelId,
         userId: req.session.userId,
      }).save();
   }

   @Mutation(() => Boolean)
   async leaveChannel(@Ctx() { req }: MyContext) {
      return await Participant.delete({ userId: req.session.userId });
   }
}
