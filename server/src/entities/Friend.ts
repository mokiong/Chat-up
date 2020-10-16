import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   JoinColumn,
   ManyToOne,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm'
import { Entity } from 'typeorm/decorator/entity/Entity'
import { User } from './User'

@ObjectType()
@Entity()
export class Friend extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number

   @Field(() => User)
   @Column()
   user1!: User

   @Field(() => User)
   @Column()
   user2: User

   @Field()
   @ManyToOne(() => User, user => user.friends)
   user: User;

   @Field()
   @Column({ type: 'int' })
   relationship!: number

   @Field(() => String)
   @CreateDateColumn()
   createdAt: Date

   @Field(() => String)
   @UpdateDateColumn()
   updatedAt: Date
}
