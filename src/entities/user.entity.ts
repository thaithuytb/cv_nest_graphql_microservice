import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { Field, ObjectType, registerEnumType, Int } from '@nestjs/graphql';
import { CustomBaseEntity } from './customBaseEntity';
import { uuid } from 'uuidv4';
import { Cv } from './cv.entity';

export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity({ tableName: 'users' })
export class User extends CustomBaseEntity {
  @Field((_type) => String)
  @Property({ unique: true })
  email!: string;

  @Field((_type) => String)
  @Property()
  username: string = uuid();

  @Field((_type) => Int)
  @Property({
    default: 18,
  })
  age: number;

  @Property()
  password!: string;

  @Field((_type) => UserRole)
  @Enum({
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @Field((_type) => [Cv])
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs = new Collection<Cv>(this);
}
