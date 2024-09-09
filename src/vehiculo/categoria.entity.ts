import {
    Entity,
    Property,
    ManyToMany,
    Collection,
    Cascade,
    OneToMany
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Marca } from './marca.entity.js'


@Entity()
export class Categoria extends BaseEntity{

    @Property({ nullable: false })
    nombreCategoria!: string

    @Property({ nullable: false })
    descripcionCategoria!: string

    @OneToMany (() => Marca, marca => marca.categoria, { nullable: true })
    marcas = new Collection<Marca>(this)

}