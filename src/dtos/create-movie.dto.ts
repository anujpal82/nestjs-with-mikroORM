import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
