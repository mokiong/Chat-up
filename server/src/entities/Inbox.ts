import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   CreateDateColumn,
   JoinColumn,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { Conversation } from './Conversation'
import { User } from './User'

@ObjectType()
@Entity()
export class Inbox extends BaseEntity {
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
   user2: User

   @Field(() => Conversation)
   @OneToMany(() => Conversation, (convo) => convo.inbox)
   convo: Conversation[]

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date
}
