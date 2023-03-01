import { Property, PrimaryKey } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({
    autoincrement: true,
  })
  id!: number;

  @Property({
    type: 'timestamptz',
  })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
