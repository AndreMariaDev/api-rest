import { ApiProperty } from '@nestjs/swagger';
export class ReportDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: AddressDto[];
}

export class AddressDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
}

export class ReportDownloadDto {
    @ApiProperty()
    id: number;
}