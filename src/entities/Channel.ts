import { Field, ObjectType } from 'type-graphql';
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   OneToMany,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { Message } from './Message';
import { Participant } from './Participant';

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
   @Field()
   @PrimaryColumn()
   id!: String;

   @Field()
   @Column({ unique: true })
   name!: String;

   @OneToMany(() => Message, (message) => message.channel)
   messages: Message[];

   @OneToMany(() => Participant, (participant) => participant.channel)
   users: Participant[];

   // @Field()
   // @Column({ default: null })
   // inboxId!: number;

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date;

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date;
}
