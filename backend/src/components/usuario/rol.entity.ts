import {
    
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany,
    Collection,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'


@Entity()
export class Rol extends BaseEntity {
    
    @Property({ nullable: false })
    nombreRol!: string

    @OneToMany(()=> Usuario , usuario =>usuario.rol, { nullable: false, cascade: [Cascade.REMOVE] })
    usuarios = new Collection<Usuario>(this)

}