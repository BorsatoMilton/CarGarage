import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Tarjeta } from './tarjeta.entity.js'
import { Calificacion } from './calificacion.entity.js'
import { Pedido } from '../pedido/pedido.entity.js'

@Entity()
export class Usuario extends BaseEntity {
    @Property({ nullable: false })
    usuario!: string

    @Property({ nullable: false })
    clave!: string

    @Property({ nullable: false})
    nombre!: string
    
    @Property({ nullable: false})
    apellido!: string
    
    @Property({ nullable: false})
    mail!: string
    
    @Property({ nullable: false})
    direccion!: string

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario, { nullable: false })
    tarjeta?: Rel<Tarjeta>;

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario, { nullable: false })
    calificacion?: Rel<Calificacion>;

    @OneToMany(() => Pedido, pedido => pedido.usuario , { nullable: true })
    pedido?: Rel<Pedido>;

  }