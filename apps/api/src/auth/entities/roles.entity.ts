import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn('increment')
    id_role: number;

    @Column('varchar', { length: 50, unique: true })
    name: string;

    @OneToMany(
      () => User, // con que tabla se relaciona
      user => user.role, // campo de relacion en la otra tabla
      // { cascade: true } // opciones adicionales
    )
    users: User[];
}
