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
import { Tarjeta } from './tarjeta.entity.js';
import { Calificacion } from './calificacion.entity.js';
import { Compra } from '../compra/compra.entity.js';
import { Vehiculo } from '../vehiculo/vehiculo.entity.js';
import { Alquiler } from '../alquiler/alquiler.entity.js';
import { Rol } from './rol.entity.js';
let Usuario = class Usuario extends BaseEntity {
    constructor() {
        super(...arguments);
        this.tarjetas = new Collection(this);
        this.calificacionesUsuario = new Collection(this);
        this.compras = new Collection(this);
        this.vehiculos = new Collection(this);
        this.alquilerLocador = new Collection(this);
        this.alquilerLocatorio = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "usuario", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "clave", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "mail", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "direccion", void 0);
__decorate([
    OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "tarjetas", void 0);
__decorate([
    OneToMany(() => Calificacion, calificacion => calificacion.usuario, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "calificacionesUsuario", void 0);
__decorate([
    OneToMany(() => Compra, compra => compra.usuario, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "compras", void 0);
__decorate([
    OneToMany(() => Vehiculo, vehiculo => vehiculo.vendedor, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "vehiculos", void 0);
__decorate([
    OneToMany(() => Alquiler, alquiler => alquiler.locador, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "alquilerLocador", void 0);
__decorate([
    OneToMany(() => Alquiler, alquiler => alquiler.locatario, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "alquilerLocatorio", void 0);
__decorate([
    ManyToOne(() => Rol, { nullable: false }),
    __metadata("design:type", Object)
], Usuario.prototype, "rol", void 0);
Usuario = __decorate([
    Entity()
], Usuario);
export { Usuario };
//# sourceMappingURL=usuario.entity.js.map