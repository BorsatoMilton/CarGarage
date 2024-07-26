import {
    OneToOne,
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Modelo } from '../producto/modelo.entity.js'
import { Categoria } from '../producto/categoria.entity.js'
import { Calificacion } from '../usuario/calificacion.entity.js'
import { LineaCompra } from '../pedido/lineacompra.entity.js'

@Entity()
export class Producto extends BaseEntity {
    
    @Property({ nullable: false })
    nombre!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ nullable: false})
    fechaAlta!: Date //= new Date()

    @Property({ nullable: true })
    fechaBaja?: Date 

    @Property({ nullable: false })
    stock!: number

    @Property({ nullable: false })
    precioVenta!: number

    @ManyToOne(() => Modelo, { nullable: false })
    modelo!: Rel<Modelo>

    @ManyToOne(() => Categoria , { nullable: true })
    categoria!: Rel<Categoria>

    @OneToMany(() => Calificacion, calificacion => calificacion.producto, { nullable: false })
    calificacion?: Rel<Calificacion>;

    @OneToMany (() => LineaCompra, linea => linea.producto, { nullable: false })
    linea!: Rel<LineaCompra>

}