import {
    Entity,
    Property,
    OneToMany,
    Collection,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Producto } from './vehiculo.entity.js'


@Entity()
export class Categoria extends BaseEntity{

    @Property({ nullable: false })
    nombreCategoria!: string

    @Property({ nullable: false })
    descripcionCategoria!: string

    @OneToMany(() => Producto, producto => producto.categoria,{nullable: true, cascade: [Cascade.ALL]})    
    productos = new Collection<Producto>(this)

    
}