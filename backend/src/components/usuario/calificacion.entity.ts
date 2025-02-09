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

    @Property({ nullable: true })
    comentario?: string

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>

}