import { Role } from "../../entities/role.entity";

export interface Login{
    name: string,
    userName:string,
    idUser:number,
    role: Role
}