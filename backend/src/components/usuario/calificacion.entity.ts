import {
    Entity,
    Property,
    ManyToOne,
    Rel
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Usuario } from './usuario.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'


@Entity()
export class Calificacion extends BaseEntity {
    @Property({ nullable: false })
    fechaCalificacion!: Date 

    @Property({ nullable: false })
    valoracion!: number

    @Property({ nullable: false })
    observacion?: string

    @ManyToOne(() => Usuario, { nullable: true })
    usuario!: Rel<Usuario>

    @ManyToOne(() => Vehiculo, { nullable: true })
    vehiculo!: Rel<Vehiculo>

}