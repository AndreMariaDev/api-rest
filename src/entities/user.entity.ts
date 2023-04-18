import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Role } from  './role.entity';

@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    refreshToken: string;

    @Column()
    isActive: boolean;

    @Column()
    roleId: number;

    @ManyToOne(() => Role, (role) => role.user, { cascade: true})
    @JoinTable()
    role: Role
}
