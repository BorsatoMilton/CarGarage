import {
    
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany,
    Collection
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Calificacion } from '../usuario/calificacion.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Alquiler } from '../alquiler/alquiler.entity.js'
import { Marca } from './marca.entity.js'
import { Compra } from '../compra/compra.entity.js'
import { Categoria } from './categoria.entity.js'

@Entity()
export class Vehiculo extends BaseEntity {
    
    @Property({ nullable: false })
    nombre!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ type: 'date' })
    fechaAlta: Date = new Date();

    @Property({ type: 'date', nullable: true })
    fechaBaja?: Date

    @Property({ nullable: false })
    precioVenta!: number

    @Property({ nullable: false })
    precioAlquilerDiario!: number

    @Property({ nullable: false })
    stock?: number

    @Property({ nullable: true })
    modelo!: string

    @Property({ nullable: true, type: 'text' }) 
    imagenes!: string[];

    @ManyToOne(() => Categoria , { nullable: false })
    categoria!: Rel<Categoria>

    @ManyToOne(() => Marca , { nullable: false })
    marca!: Rel<Marca>

    @ManyToOne(() => Usuario , { nullable: true })
    vendedor?: Rel<Usuario>

    @OneToMany(()=> Alquiler , alquiler => alquiler.vehiculo, { nullable: true })
    alquileres = new Collection<Alquiler>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.vehiculo, { nullable: true })
    calificaciones = new Collection<Calificacion>(this)

    @OneToMany(() => Compra, compra => compra.vehiculo, { nullable: true })
    compras = new Collection<Compra>(this)


}