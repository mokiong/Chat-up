import { MyContext } from '../utilities/types';
import {
   Arg,
   Ctx,
   Field,
   FieldResolver,
   InputType,
   Int,
   Mutation,
   Query,
   Resolver,
   Root,
} from 'type-graphql';
import { Friend } from '../entities/Friend';
import { User } from '../entities/User';

@InputType()
class UserInput {
   @Field()
   email: string;
   @Field()
   username: string;
   @Field()
   password: string;
}

@Resolver(User)
export class UserResolver {
   // @FieldResolver(() => User)
   // friends(
   //    @Root() users: User[]
   //    // @Ctx() { userLoader } : MyContext
   // ) {
   //    const friends = Friend.find()
   // }

   // Queries
   @Query(() => [User])
   async users(): Promise<User[]> {
      const users = await User.find();
      return users;
   }

   @Query(() => User)
   async user(
      @Arg('userId', () => Int) userId: number
   ): Promise<User | undefined> {
      const user = await User.findOne(userId);
      return user;
   }

   // Mutations
   @Mutation(() => User)
   async createUser(@Arg('args') args: UserInput): Promise<User> {
      return await User.create({
         ...args,
      }).save();
   }

   //----------------------------FRIEND-----------------------------------
   @Mutation(() => Friend)
   async addFriend(
      @Arg('userId', () => Int) userId: number,
      @Arg('friendId', () => Int) friendId: number
   ) {
      const me = await User.findOne(userId);
      const friend = await User.findOne(friendId);

      const resolve = await Friend.create({
         user1: me,
         user2: friend,
         relationship: 1,
      }).save();

      return resolve;
   }

   @Query(() => [Friend])
   async friends() {
      const a = await Friend.find();
      console.log('users : ', a);
      return a;
   }
}
