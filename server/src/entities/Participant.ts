import { Field, ObjectType } from 'type-graphql';
import {
   BaseEntity,
   CreateDateColumn,
   JoinColumn,
   ManyToOne,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Channel } from './Channel';
import { Message } from './Message';
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

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
