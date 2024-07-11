import {
    Entity,
    Property,
    ManyToOne,
    Rel
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Modelo } from '../producto/modelo.entity.js'

@Entity()
export class Producto extends BaseEntity {
    @Property({ nullable: false })
    nombre!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ nullable: false})
    fechaAlta!: Date //= new Date()

    @Property({ nullable: true })
    fechaBaja?: Date 

    @Property({ nullable: false })
    stock!: number

    @Property({ nullable: false })
    precioVenta!: number

    @ManyToOne(() => Modelo, { nullable: false })
    modelo!: Rel<Modelo>

}