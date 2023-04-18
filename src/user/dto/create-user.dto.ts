import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ nullable: true})
    refreshToken: string;

    @ApiProperty()
    roleId: number;
}
