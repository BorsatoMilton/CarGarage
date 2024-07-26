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

export class LineaCompra extends BaseEntity{
    @Property ({nullable: false})
    cantidad!: number
    
    @ManyToOne(() => Pedido, { nullable: false })
    pedido!: Rel<Pedido>

    @ManyToOne(() => Producto, { nullable: true })
    producto!: Rel<Producto>
}