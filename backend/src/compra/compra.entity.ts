import {
    Entity,
    Property,
    Collection,
    OneToMany,
    ManyToOne,
    Rel

} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { Vehiculo } from '../vehiculo/vehiculo.entity.js'

@Entity()
export class Compra extends BaseEntity{

    @Property({ nullable: false })
    fechaCompra!:Date
    
    @Property({ nullable: false })
    fechaLimitePago!:Date
    
    @Property({ nullable: true })
    fechaCancelacion!:Date

    @ManyToOne(() => Usuario, { nullable: false })
    usuario!: Rel<Usuario>

    @ManyToOne(() => Vehiculo, { nullable: false })
    vehiculo!: Rel<Vehiculo>

    
    
}




