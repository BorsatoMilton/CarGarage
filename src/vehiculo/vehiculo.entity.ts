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
// import { Alquiler } from '../alquiler/alquiler.entity.js'
import { Marca } from './marca.entity.js'
import { Compra } from '../compra/compra.entity.js'

@Entity()
export class Vehiculo extends BaseEntity {
    
    @Property({ nullable: false })
    nombre!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ nullable: false})
    fechaAlta!: Date //new Date()??

    @Property({ nullable: true })
    fechaBaja?: Date 

    @Property({ nullable: false })
    precioVenta!: number

    @Property({ nullable: false })
    precioAlquilerDiario!: number

    @Property({ nullable: false })
    stock!: number

    @Property({ nullable: true })
    modelo?: string

    @ManyToOne(() => Marca , { nullable: false })
    marca!: Rel<Marca>

    @ManyToOne(() => Usuario , { nullable: false })
    vendedor!: Rel<Usuario>

    //@OneToMany(()=> Alquiler , alquiler => alquiler.vehiculo, { nullable: true })
    //alquiler = new Collection<Subasta>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.vehiculo, { nullable: false })
    calificaciones = new Collection<Calificacion>(this)

    @OneToMany(() => Compra, compra => compra.vehiculo, { nullable: false })
    compras = new Collection<Compra>(this)


}