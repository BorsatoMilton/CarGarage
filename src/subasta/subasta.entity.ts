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
import { Usuario } from '../subasta/usuario.entity.js'
import { Producto } from '../subasta/producto.entity.js'

@Entity()
export class Subasta extends BaseEntity {
    @Property({ nullable: false })
    idsubasta!: number

    @Property({ nullable: false})
    fechaAlta!: Date //= new Date()

    @Property({ nullable: true })
    fechahora!: DateTimeType

    @Property({ nullable: false })
    precio_base_entrada!: number

    @Property({ nullable: false })
    precio_cierre!: number

    @OneToOne(() => Producto, { nullable: false })
    producto!: Rel<Producto>
/*
    @ManyToOne(() => Usuario , { nullable: false })
    usuario!: Rel<Usuario>

    @ManyToMany(() => Usuario , { nullable: true })
    usuario?: Rel<Usuario>
    */

}