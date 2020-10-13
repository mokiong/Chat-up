import { Field, ID, ObjectType } from "type-graphql";
import { Column } from "typeorm/decorator/columns/Column";
import { ObjectIdColumn } from "typeorm/decorator/columns/ObjectIdColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { ObjectID } from "typeorm/driver/mongodb/typings";


@ObjectType()
@Entity()
export class User {
   
   @Field(() => ID)
   @ObjectIdColumn()
   id: ObjectID;

   @Field()
   @Column(() => String)
   username!: string;

   @Field()
   @Column(() => String)
   email!: string;

   @Field()
   @Column(() => String)
   password!: string;


}