import { Field, ObjectType } from 'type-graphql';
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Channel } from './Channel';
import { User } from './User';

@ObjectType()
@Entity()
export class Participant extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number;

   @ManyToOne(() => User, (user) => user.channels)
   user: User;

   @ManyToOne(() => Channel, (channel) => channel.users)
   channel: Channel[];

   @Field()
   @Column()
   userId: number;

   @Field()
   @Column()
   channelId: String;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
