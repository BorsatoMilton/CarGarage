import {
    Entity,
    Property,
    OneToMany,
    Cascade,
    Collection,
    ManyToOne,
    Rel
  } from '@mikro-orm/core'
  import { Producto } from './vehiculo.entity.js'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Marca } from './marca.entity.js'

@Entity()
  export class Modelo extends BaseEntity {

    @Property({ nullable: false })
    nombreModelo!: string

    @Property({ nullable: false })
    descripcionModelo!: string

    @OneToMany(() => Producto, (producto)=> producto.modelo, {cascade: [Cascade.ALL], nullable: false})
    productos = new Collection<Producto>(this)

    @ManyToOne(() => Marca, { nullable: false })
    marca!: Rel<Marca>
    
  }