import {
    
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany,
    Collection
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Modelo } from '../producto/modelo.entity.js'
import { Categoria } from '../producto/categoria.entity.js'
import { Calificacion } from '../usuario/calificacion.entity.js'
import { LineaCompra } from '../pedido/lineacompra.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Subasta } from '../subasta/subasta.entity.js'

@Entity()
export class Producto extends BaseEntity {
    
    @Property({ nullable: false })
    nombre!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ nullable: false})
    fechaAlta!: Date //new Date()??

    @Property({ nullable: true })
    fechaBaja?: Date 

    @Property({ nullable: false })
    stock!: number

    @Property({ nullable: false })
    precioVenta!: number

    @ManyToOne(() => Modelo, { nullable: false })
    modelo!: Rel<Modelo>

    @ManyToOne(() => Categoria , { nullable: false })
    categoria!: Rel<Categoria>

    @ManyToOne(() => Usuario , { nullable: false })
    vendedor!: Rel<Usuario>

    @OneToMany(()=> Subasta , subasta => subasta.producto, { nullable: true })
    subastas = new Collection<Subasta>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.producto, { nullable: false })
    calificaciones = new Collection<Calificacion>(this)

    @OneToMany (() => LineaCompra, linea => linea.producto, { nullable: false })
    lineasCompra = new Collection<LineaCompra>(this)

}