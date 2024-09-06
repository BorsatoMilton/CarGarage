import {
    Entity,
    Property,
    ManyToMany,
    Collection,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Marca } from './marca.entity.js'


@Entity()
export class Categoria extends BaseEntity{

    @Property({ nullable: false })
    nombreCategoria!: string

    @Property({ nullable: false })
    descripcionCategoria!: string

    @ManyToMany(() => Marca, marca => marca.categorias, { nullable: true, cascade: [Cascade.ALL] , owner:true})
    marcas = new Collection<Marca>(this)

}