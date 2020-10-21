import { Channel } from '../entities/Channel';
import {
   Arg,
   Field,
   Int,
   Mutation,
   ObjectType,
   Query,
   Resolver,
} from 'type-graphql';
import { v4 } from 'uuid';
import { User } from '../entities/User';

@ObjectType()
class ChannelResponse {
   // ? means undefined
   @Field({ nullable: true })
   errors?: String;

   @Field(() => Channel, { nullable: true })
   channel?: Channel;
}

@Resolver(Channel)
export class ChannelResolver {
   // @FieldResolver(() => User)
   // friends(
   //    @Root() users: User[]
   //    // @Ctx() { userLoader } : MyContext
   // ) {
   //    const friends = Friend.find()
   // }

   // Queries
   @Query(() => [Channel])
   async channels(): Promise<Channel[]> {
      const channels = await Channel.find({ relations: ['inbox'] });
      console.log(channels);
      return channels;
   }

   @Query(() => User)
   async channel(@Arg('name') channelName: String): Promise<User | undefined> {
      const channel = await User.findOne({ where: { name: channelName } });
      return channel;
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

   @Mutation(() => ChannelResponse)
   async joinChannel(
      @Arg('name') channelName: String
   ): Promise<ChannelResponse> {
      const channel = await Participant.create({});
   }
}
