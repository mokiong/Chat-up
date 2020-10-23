import { Field, ObjectType } from 'type-graphql';
import {
   BaseEntity,
   CreateDateColumn,
   ManyToOne,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Channel } from './Channel';
import { User } from './User';

@ObjectType()
@Entity()
export class Participant extends BaseEntity {
   @ManyToOne(() => User, (user) => user.channels)
   user: User;

   @ManyToOne(() => Channel, (channel) => channel.users)
   channel: Channel;

   @Field()
   @PrimaryColumn()
   userId!: number;

   @Field()
   @PrimaryColumn()
   channelId!: String;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
