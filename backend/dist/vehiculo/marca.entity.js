var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Collection, OneToMany, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Categoria } from './categoria.entity.js';
import { Vehiculo } from './vehiculo.entity.js';
let Marca = class Marca extends BaseEntity {
    constructor() {
        super(...arguments);
        this.vehiculos = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Marca.prototype, "nombreMarca", void 0);
__decorate([
    OneToMany(() => Vehiculo, vehiculo => vehiculo.marca, { nullable: true }),
    __metadata("design:type", Object)
], Marca.prototype, "vehiculos", void 0);
__decorate([
    ManyToOne(() => Categoria, { nullable: true }),
    __metadata("design:type", Object)
], Marca.prototype, "categoria", void 0);
Marca = __decorate([
    Entity()
], Marca);
export { Marca };
//# sourceMappingURL=marca.entity.js.map