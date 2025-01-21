import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Usuario } from './usuario.entity.js'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { BaseEntity } from '../../shared/db/baseEntity.entity.js';

@Entity()
export class PasswordResetToken extends BaseEntity {

  @Property({ unique: true })
  token!: string;

  @ManyToOne(() => Usuario)
  user!: Usuario;

  @Property()
  expiryDate!: Date;

  constructor(token: string, user: Usuario) {
    super(); 
    this.token = token;
    this.user = user;
    this.expiryDate = this.calculateExpiryDate(1); // Token válido por 1 hora
  }

  private calculateExpiryDate(hours: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
  }
}
