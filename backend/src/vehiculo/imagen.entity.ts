import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Vehiculo } from './vehiculo.entity.js';

@Entity()
export class Image {
  @PrimaryKey()
  _id!: string;

  @Property()
  filename!: string;

  @Property()
  contentType!: string;

  @Property({ type: 'Buffer' })
  data!: Buffer;  

  @ManyToOne(() => Vehiculo)  
  vehiculo!: Vehiculo;  
}
