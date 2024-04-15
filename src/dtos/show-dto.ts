import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createShowDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    movieId: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}   