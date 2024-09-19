import {
    Entity,
    Property,
    ManyToOne,
    Rel
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Compra } from './compra.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'


@Entity()

export class LineaCompra extends BaseEntity{
    @Property ({nullable: false})
    cantidad!: number
    
    @ManyToOne(() => Compra, { nullable: false })
    compra!: Rel<Compra>

    @ManyToOne(() => Vehiculo, { nullable: false })
    vehiculo!: Rel<Vehiculo>
}