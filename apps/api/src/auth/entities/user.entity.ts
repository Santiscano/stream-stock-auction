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
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the user',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('increment')
  id_user: number;

  @ApiProperty({
    example: 'santiscano@gmail.com',
    description: 'User email',
    uniqueItems: true
  })
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password'
  })
  @Column('varchar')
  password: string;

  @ApiProperty({
    example: 'Santiago Sierra',
    description: 'User full name'
  })
  @Column('varchar')
  fullName: string;

  @ApiProperty({
    example: true,
    description: 'User status'
  })
  @Column('boolean', { default: false })
  isActive: boolean;

  @ApiProperty({
    example: '2021-09-23T17:00:00.000Z',
    description: 'User creation date'
  })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-09-23T17:00:00.000Z',
    description: 'User update date'
  })
  @Column('timestamp', { nullable: true })
  deletedAt: Date;

  @ApiProperty({
    example: 'Santiago Sierra',
    description: 'User who deleted the user'
  })
  @Column('text', { nullable: true })
  deletedBy: string;

  @ManyToOne(
    () => Role, // con que tabla se relaciona 
    (role) => role.users, // campo de relacion en la otra tabla
    { nullable: false, eager: true } // opciones adicionales
  )
  @JoinColumn({ name: 'id_role'})
  role: Role;

  @ApiProperty({
    example: 'https://www.google.com',
    description: 'User avatar'
  })
  @Column('varchar')
  avatarUrl: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
