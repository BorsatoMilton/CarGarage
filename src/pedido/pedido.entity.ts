import {
    Entity,
    Property,
    Collection,
    OneToMany,
    ManyToOne,
    Rel

} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { LineaCompra } from './lineacompra.entity.js'

@Entity()
export class Pedido extends BaseEntity{

    @OneToMany (() => LineaCompra, lineacompra => lineacompra.pedido, { nullable: false })
    lineasCompra = new Collection<LineaCompra>(this)

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>

    @Property({ nullable: false })
    fechaPedido!:Date
    
}




