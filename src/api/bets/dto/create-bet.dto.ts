import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNumber, IsUUID, Min } from "class-validator";

export class CreateBetDto {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    points: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    missed: number;

    @IsBoolean()
    @ApiProperty()
    isMax: boolean;

    @IsDefined()
    @IsUUID()
    @ApiProperty()
    accountId: string;

    @IsDefined()
    @IsUUID()
    @ApiProperty()
    seasonGamedayId: string;
}
