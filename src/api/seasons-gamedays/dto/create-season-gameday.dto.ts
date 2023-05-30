import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID, IsDateString, IsOptional } from "class-validator";

export class CreateSeasonGamedayDto {
    @IsDefined()
    @IsUUID()
    @ApiProperty()
    gamedayId: string;

    @IsDefined()
    @IsUUID()
    @ApiProperty()
    seasonId: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({ required: false })
    dateStart: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty({ required: false })
    dateEnd: Date;
}