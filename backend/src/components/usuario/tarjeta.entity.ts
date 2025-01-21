import {
    Entity,
    Property,
    ManyToOne,
    Rel
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Usuario } from './usuario.entity.js'


@Entity()
export class Tarjeta extends BaseEntity {

    @Property({ nullable: false })
    numeroTarjeta!: number

    @Property({ nullable: false })
    codSeguridad!: number

    @Property({ nullable: false })
    fechaVencimiento!: Date 

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>
  }