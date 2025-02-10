import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    DateTimeType,
    OneToOne
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

@Entity()
export class Alquiler extends BaseEntity {
    
    @Property({ nullable: false })
    fechaAlquiler!: Date

    @Property({ nullable: false })
    fechaHoraInicioAlquiler!: Date

    @Property({ nullable: false})
    fechaHoraDevolucion!: Date

    @Property({ nullable: false })
    estadoAlquiler!: String

    @Property({ nullable: false })
    tiempoConfirmacion!: Date
    
    @ManyToOne(() => Usuario , { nullable: false })
    locatario!: Rel<Usuario>
    
    @ManyToOne(() => Vehiculo , { nullable: false })
    vehiculo!: Rel<Vehiculo>

}