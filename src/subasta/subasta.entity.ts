import {
    Entity,
    Property,
    ManyToOne,
    OneToOne,
    ManyToMany,
    Rel,
    DateTimeType
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Producto } from '../producto/producto.entity.js'

@Entity()
export class Subasta extends BaseEntity {
    @Property({ nullable: false})
    fechaPublicacion!: Date //= new Date()

    @Property({ nullable: true })
    fechaHoraRealizacion!: DateTimeType

    @Property({ nullable: false })
    precioBaseEntrada!: number

    @Property({ nullable: false })
    precioCierre?: number

    @ManyToOne(() => Producto, { nullable: false })
    producto!: Rel<Producto>

    @ManyToOne(() => Usuario , { nullable: false })
    usuarioCreador!: Rel<Usuario>

    @ManyToOne(() => Usuario , { nullable: true })
    usuarioGanador?: Rel<Usuario>
    

}