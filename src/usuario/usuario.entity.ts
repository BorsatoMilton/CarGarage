import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany, 
    Collection
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Tarjeta } from './tarjeta.entity.js'
import { Calificacion } from './calificacion.entity.js'
import { Pedido } from '../pedido/compra.entity.js'
import {Producto } from '../vehiculo/vehiculo.entity.js'
import {Subasta } from '../subasta/subasta.entity.js'

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
    tarjetas = new Collection<Tarjeta>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario, { nullable: false })
    calificacionesUsuario = new Collection<Calificacion>(this)

    @OneToMany(() => Pedido, pedido => pedido.usuario , { nullable: false })
    pedidos = new Collection<Pedido>(this)

    @OneToMany(() => Producto, producto => producto.vendedor, { nullable: false })
    productos = new Collection<Producto>(this)

    @OneToMany(() => Subasta, subasta => subasta.usuarioCreador, { nullable: false })
    subastasCreadas = new Collection<Subasta>(this)

    @OneToMany(() => Subasta, subasta => subasta.usuarioGanador, { nullable: true })
    subastasGanadas = new Collection<Subasta>(this)

  }