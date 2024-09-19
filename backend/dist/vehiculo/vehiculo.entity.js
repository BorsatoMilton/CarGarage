var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Calificacion } from '../usuario/calificacion.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
import { Alquiler } from '../alquiler/alquiler.entity.js';
import { Marca } from './marca.entity.js';
import { Compra } from '../compra/compra.entity.js';
let Vehiculo = class Vehiculo extends BaseEntity {
    constructor() {
        super(...arguments);
        this.alquileres = new Collection(this);
        this.calificaciones = new Collection(this);
        this.compras = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Vehiculo.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Vehiculo.prototype, "descripcion", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date //new Date()??
    )
], Vehiculo.prototype, "fechaAlta", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Vehiculo.prototype, "fechaBaja", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "precioVenta", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "precioAlquilerDiario", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "stock", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Vehiculo.prototype, "modelo", void 0);
__decorate([
    ManyToOne(() => Marca, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "marca", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "vendedor", void 0);
__decorate([
    OneToMany(() => Alquiler, alquiler => alquiler.vehiculo, { nullable: true }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "alquileres", void 0);
__decorate([
    OneToMany(() => Calificacion, calificacion => calificacion.vehiculo, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "calificaciones", void 0);
__decorate([
    OneToMany(() => Compra, compra => compra.vehiculo, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "compras", void 0);
Vehiculo = __decorate([
    Entity()
], Vehiculo);
export { Vehiculo };
//# sourceMappingURL=vehiculo.entity.js.map