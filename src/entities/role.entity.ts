import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { User } from "../entities/user.entity";

@Entity("Role")
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    rolelevel: number;

    @OneToMany(() => User, (user) => user.role)
    user: User[];
}
