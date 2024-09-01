import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Role } from './roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id_user: number;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  fullName: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  deletedAt: Date;

  @Column('text', { nullable: true })
  deletedBy: string;

  @ManyToOne(
    () => Role, // con que tabla se relaciona 
    (role) => role.users, // campo de relacion en la otra tabla
    { nullable: false, eager: true } // opciones adicionales
  )
  @JoinColumn({ name: 'id_role'})
  role: Role;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
