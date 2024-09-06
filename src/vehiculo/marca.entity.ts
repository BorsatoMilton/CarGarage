import {
    Entity,
    Property,
    Collection,
    Cascade,
    ManyToMany
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Categoria } from './categoria.entity.js'

@Entity()

export class Marca extends BaseEntity{

    @Property({ nullable: false })
    nombreMarca!: string

    @ManyToMany(()=> Categoria, categoria => categoria.marcas, { nullable: true, cascade: [Cascade.ALL] })
    categorias = new Collection<Categoria>(this)
}