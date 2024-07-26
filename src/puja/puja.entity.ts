import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    DateTimeType
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../puja/usuario.entity.js'
import { Subasta } from '../puja/subasta.entity.js'


@Entity()
export class Puja extends BaseEntity {


    @Property({ nullable: false})
    fecha_puja!: Date //= new Date()

    @Property({ nullable: false })
    monto!: number

    @ManyToOne(() => Subasta, { nullable: false })
    subasta!: Rel<Subasta>
    @ManyToOne(() => Usuario, { nullable: false})
    usuario!: Rel<Usuario>

}