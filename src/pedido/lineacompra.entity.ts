import {
    Entity,
    Property,
    ManyToOne,
    Collection,
    Cascade,
    Rel,
    OneToOne,
    
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Pedido } from './pedido.entity.js'
import { Producto } from '../producto/producto.entity.js'


@Entity()

export class lineacompra extends BaseEntity{
    @Property ({nullable: false})
    cantidad!: number
    @ManyToOne(() => Pedido, { nullable: false })
    Pedido!: Rel<Pedido>
    @OneToOne(() => Producto, { nullable: true })
    producto!: Rel<Producto>
}