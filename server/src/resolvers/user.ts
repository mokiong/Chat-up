import { User } from "../entities/User";
import { MyContext } from "../utilities/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";




@Resolver(User)
export class UserResolver {
   // Queries
   @Query(() => [User])
   async users(
      @Ctx() { conn } : MyContext
   ): Promise<User[]>{
      const users = await conn.find(User)
      return users;
   }


   // Mutations
   @Mutation(() => User)
   async createUser(
      @Arg('args') args : User,
   ): Promise<User>{
      let user = new User();
      user = {...args};

      return user;
   }
   
   
}