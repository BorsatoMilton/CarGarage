import {
    Entity,
    Property,
    Collection,
    OneToMany,
    ManyToOne,
    Rel,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Categoria } from './categoria.entity.js'
import { Vehiculo } from './vehiculo.entity.js'

@Entity()

export class Marca extends BaseEntity{

    @Property({ nullable: false })
    nombreMarca!: string

    @OneToMany(()=> Vehiculo, vehiculo => vehiculo.marca, { nullable: true, cascade: [Cascade.REMOVE]   })
    vehiculos = new Collection<Vehiculo>(this)

}