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
export class Message extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number;

   @ManyToOne(() => User)
   user!: User;

   @ManyToOne(() => Channel, (channel) => channel.messages)
   channel!: Channel;

   @Field()
   @Column()
   userId!: number;

   @Field()
   @Column()
   channelId!: String;

   @Field()
   @Column()
   text!: String;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
