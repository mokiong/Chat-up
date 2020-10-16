import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { Conversation } from './Conversation'

@ObjectType()
@Entity()
export class Message extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number

   @Field(() => Conversation)
   @ManyToOne(() => Conversation, (convo) => convo.message)
   convo!: Conversation

   @Field()
   @Column()
   text!: String

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date
}
