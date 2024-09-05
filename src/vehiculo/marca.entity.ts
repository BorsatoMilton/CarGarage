import {
    Entity,
    Property,
    OneToMany,
    Collection,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Modelo } from './modelo.entity.js'

@Entity()

export class Marca extends BaseEntity{

    @Property({ nullable: false })
    nombreMarca!: string

    @OneToMany(() => Modelo, modelo => modelo.marca, {cascade : [Cascade.ALL], nullable: true})    
    modelos = new Collection<Modelo>(this)
}