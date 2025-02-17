import {
    
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany,
    Collection,
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Calificacion } from '../usuario/calificacion.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Alquiler } from '../alquiler/alquiler.entity.js'
import { Marca } from './marca.entity.js'
import { Compra } from '../compra/compra.entity.js'
import { Categoria } from './categoria.entity.js'

@Entity()
export class Vehiculo extends BaseEntity {
    
    @Property({ nullable: false })
    modelo!: string

    @Property({ nullable: false })
    descripcion!: string

    @Property({ type: 'date' })
    fechaAlta: Date = new Date();

    @Property({ type: 'date', nullable: true })
    fechaBaja?: Date

    @Property({ nullable: true })
    precioVenta?: number

    @Property({ nullable: false})
    transmision!: string

    @Property({ nullable: true })
    precioAlquilerDiario?: number

    @Property({ nullable: false })
    kilometros!: number

    @Property({ nullable: true })
    anio!: string

    @Property({ nullable: true, type: 'text' }) 
    imagenes!: string[];

    @Property({ nullable: true })
    Compra?: Rel<Compra>

    @ManyToOne(() => Categoria , { nullable: false })
    categoria!: Rel<Categoria>

    @ManyToOne(() => Marca , { nullable: false })
    marca!: Rel<Marca>

    @ManyToOne(() => Usuario , { nullable: false })
    propietario!: Rel<Usuario>

    @OneToMany(()=> Alquiler , alquiler => alquiler.vehiculo, { nullable: true })
    alquileres = new Collection<Alquiler>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.vehiculo, { nullable: true })
    calificaciones = new Collection<Calificacion>(this)



}