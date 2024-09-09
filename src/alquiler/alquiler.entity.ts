import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    DateTimeType
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

@Entity()
export class Alquiler extends BaseEntity {
    
    @Property({ nullable: false })
    fechaAlquiler!: Date

    @Property({ nullable: false })
    fechaHoraInicioAlquiler!: DateTimeType

    @Property({ nullable: false})
    fechaHoraDevolucion!: DateTimeType

    @Property({ nullable: false })
    estadoAlquiler!: String

    @Property({ nullable: false })
    precioTotal!: number

    @ManyToOne(() => Usuario , { nullable: false })
    locador!: Rel<Usuario>
    
    @ManyToOne(() => Usuario , { nullable: false })
    locatario!: Rel<Usuario>
    
    @ManyToOne(() => Vehiculo , { nullable: false })
    vehiculo!: Rel<Vehiculo>

}