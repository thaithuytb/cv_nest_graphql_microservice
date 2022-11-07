import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { uuid } from 'uuidv4';

export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property()
  username: string = uuid();

  @Property({
    default: 18,
  })
  age: number;

  @Property()
  password!: string;

  @Enum({
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;
}
