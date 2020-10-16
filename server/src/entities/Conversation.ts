import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   CreateDateColumn,
   JoinColumn,
   ManyToOne,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { Inbox } from './Inbox'
import { Message } from './Message'
import { User } from './User'

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number

   @Field(() => User)
   @OneToOne(() => User)
   @JoinColumn()
   user1!: User

   @Field(() => User)
   @OneToOne(() => User)
   @JoinColumn()
   user2!: User

   @Field(() => Inbox)
   @ManyToOne(() => Inbox, (inbox) => inbox.convo)
   inbox!: Inbox

   @Field(() => Message)
   @OneToMany(() => Message, (message) => message.convo)
   message: Message[]

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date
}
